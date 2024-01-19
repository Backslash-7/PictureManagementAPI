import { Injectable } from '@nestjs/common';
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
    if (folderName.trim() === "") {
      throw new Error(`Empty or whitespace-only Folder Name not allowed`);
    }
    const RootFolderName = folderName.replace(/[^a-zA-Z0-9]/g, '_'); 
    const folderPath = path.join(this.rootDirectory, RootFolderName);
  
    if (this.folderExists(this.rootDirectory, RootFolderName)) {
      throw new Error(` '${RootFolderName}' already exists!!!`);
    }
  
    fs.mkdirSync(folderPath, { recursive: true });
    return ` '${RootFolderName}' successfully created!!!`;
  }
  
  private folderExists(currentPath: string, targetFolderName: string): boolean {
    try {
      const entries = fs.readdirSync(currentPath);
  
      for (const entry of entries) {
        const entryPath = path.join(currentPath, entry);
        const isDirectory = fs.statSync(entryPath).isDirectory();
  
        if (entry === targetFolderName) {
          return true;
        }
  
        if (isDirectory && this.folderExists(entryPath, targetFolderName)) {
          return true;
        }
      }
  
      return false;
    } catch (error) {
      throw new Error(`Error in Folder: ${error.message}`);
    }
  }
  

  uploadFile(folderId: string, file: MulterFile): void {
    const allowedExtensions = ['.png', '.jpeg', '.jpg'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
  
    if (allowedExtensions.includes(fileExtension)) {
      const parentFolderPath = this.findFolderPath(folderId);
  
      if (!parentFolderPath) {
        throw{
          message:`Image can not be uploaded.  ${folderId} does not exist!!!`
        };
      }
  
      const filePath = path.join(parentFolderPath, file.originalname);
      fs.writeFileSync(filePath, file.buffer);
    } else {
      throw new Error('Invalid file format. Only PNG, JPG and JPEG files are allowed!!!');
    }
  }
  

  createSubfolder(parentFolderId: string, subfolderName: string): string {
    try {
      if (subfolderName.trim() === "") {
        throw new Error(`Empty or whitespace-only Sub-Folder Name not allowed`);
      }
      const SubfolderN = subfolderName.replace(/[^a-zA-Z0-9]/g, '_'); 
      const parentFolderPath = this.findFolderPath(parentFolderId);
  
      if (!parentFolderPath) {
        throw new Error(`Parent folder ${parentFolderId} does not exist!!!`);
      }
  
      const subfolderPath = path.join(parentFolderPath, SubfolderN);
  
      if (fs.existsSync(subfolderPath)) {
        throw new Error(`Subfolder with name '${SubfolderN}' already exists in the parent folder!!!`);
      }
  
      fs.mkdirSync(subfolderPath, { recursive: true });
      return `Subfolder '${SubfolderN}' successfully created in the parent folder '${parentFolderId}'!!!`;
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
      throw new Error(`Error:  ${error.message}`);
    }
  }
  
  
  getFolderContents(folderId: string): string[] {
    const rootFolderPath = path.join(this.rootDirectory);

    if (!fs.existsSync(rootFolderPath)) {
      throw new Error(`Root folder not found: ${rootFolderPath}`);
    }

    return this.readFolder(rootFolderPath, folderId);
  }

  private readFolder(folderPath: string, targetFolderId: string): string[] {
    const contents: string[] = [];

    try {
       if(!this.findFolderPath(targetFolderId))
       {
         throw new Error(`Folder does not exist`);
       }
      const entries = fs.readdirSync(folderPath);

      for (const entry of entries) {
        const entryPath = path.join(folderPath, entry);
        const isDirectory = fs.statSync(entryPath).isDirectory();

        if (entry === targetFolderId) {
          contents.push(...fs.readdirSync(entryPath)); 
        }

        if (isDirectory) {
          contents.push(...this.readFolder(entryPath, targetFolderId));
        }
      }
    } catch (error) {
      throw new Error(`Error reading folder contents`);
    }

    return contents;
  }

  
}
