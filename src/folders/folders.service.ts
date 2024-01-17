import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

export interface MulterFile {
  originalname: string;
  buffer: Buffer;
}

@Injectable()
export class FoldersService {
  private rootDirectory = path.join(__dirname, '..', '..', 'uploads'); 

  createFolder(folderName: string): string {
    const folderId = uuidv4();
    const folderPath = path.join(this.rootDirectory, folderId);

    fs.mkdirSync(folderPath, { recursive: true });
    return folderId;
  }

  uploadFile(folderId: string, file: MulterFile): void {
    const allowedExtensions = ['.png', '.jpeg', '.jpg'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
  
    if (allowedExtensions.includes(fileExtension)) {
      const parentFolderPath = this.findFolderPath(folderId);
  
      if (!parentFolderPath) {
        throw new Error(`Parent folder with ID ${folderId} does not exist.`);
      }
  
      const filePath = path.join(parentFolderPath, file.originalname);
      fs.writeFileSync(filePath, file.buffer);
    } else {
      throw new Error('Invalid file format. Only PNG, JPG and JPEG files are allowed.');
    }
  }
  

  createSubfolder(parentFolderId: string, subfolderName: string): string {
    try {
      const subfolderId = uuidv4();
      const parentFolderPath = this.findFolderPath(parentFolderId);

      if (!parentFolderPath) {
        throw new Error(`Parent folder with ID ${parentFolderId} does not exist.`);
      }

      const subfolderPath = path.join(parentFolderPath, subfolderId);

      fs.mkdirSync(subfolderPath, { recursive: true });
      return subfolderId;
    } catch (error) {
      throw new Error(`Error creating subfolder: ${error.message}`);
    }
  }

  private findFolderPath(folderId: string): string | undefined {
    try {
      const stack = [this.rootDirectory];

      while (stack.length > 0) {
        const currentPath = stack.pop()!;
        const folderPath = path.join(currentPath, folderId);

        if (fs.existsSync(folderPath)) {
          return folderPath;
        }

        const subfolders = fs.readdirSync(currentPath);

        for (const subfolder of subfolders) {
          const subfolderPath = path.join(currentPath, subfolder);
          if (fs.statSync(subfolderPath).isDirectory()) {
            stack.push(subfolderPath);
          }
        }
      }

      return undefined;
    } catch (error) {
      throw new Error(`Error finding folder path: ${error.message}`);
    }
  }
  
  
  getFolderContents(folderId: string): string[] {
    const rootFolderPath = path.join(this.rootDirectory);

    if (!fs.existsSync(rootFolderPath)) {
      throw new Error(`Root folder not found: ${rootFolderPath}`);
    }

    return this.readFolderRecursive(rootFolderPath, folderId);
  }

  private readFolderRecursive(folderPath: string, targetFolderId: string): string[] {
    const contents: string[] = [];

    try {
      const entries = fs.readdirSync(folderPath);

      for (const entry of entries) {
        const entryPath = path.join(folderPath, entry);
        const isDirectory = fs.statSync(entryPath).isDirectory();

        if (entry === targetFolderId) {
          contents.push(...fs.readdirSync(entryPath)); 
        }

        if (isDirectory) {
          contents.push(...this.readFolderRecursive(entryPath, targetFolderId));
        }
      }
    } catch (error) {
      throw new Error(`Error reading folder contents: ${error.message}`);
    }

    return contents;
  }

  
  // getFolderContents(folderId: string): string[] {
  //   const folderPath = path.join(this.rootDirectory, folderId);
  //   return this.readFolderRecursive(folderPath);
  // }

  // private readFolderRecursive(folderPath: string): string[] {
  //   const contents: string[] = [];
  //   const entries = fs.readdirSync(folderPath);

  //   for (const entry of entries) {
  //     const entryPath = path.join(folderPath, entry);
  //     const isDirectory = fs.statSync(entryPath).isDirectory();

  //     contents.push(entry);

  //     if (isDirectory) {
  //       contents.push(...this.readFolderRecursive(entryPath));
  //     }
  //   }

  //   return contents;
  // }
}
