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
  private rootDirectory = path.join(__dirname, 'uploads');

  createFolder(folderName: string): string {
    const folderId = uuidv4();
    const folderPath = path.join(this.rootDirectory, folderId);

    fs.mkdirSync(folderPath);
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
    const subfolderId = uuidv4();
    const parentFolderPath = this.findFolderPath(parentFolderId);
  
    if (!parentFolderPath) {
      throw new Error(`Parent folder with ID ${parentFolderId} does not exist.`);
    }
  
    const subfolderPath = path.join(parentFolderPath, subfolderId);
  
    fs.mkdirSync(subfolderPath, { recursive: true });
    return subfolderId;
  }
  
  // private findFolderPath(folderId: string, currentPath?: string): string | undefined {
  //   const folderPath = currentPath ? path.join(currentPath, folderId) : path.join(this.rootDirectory, folderId);
  
  //   if (fs.existsSync(folderPath)) {
  //     return folderPath;
  //   }
  
  //   const rootFolders = fs.readdirSync(this.rootDirectory);
  
  //   for (const rootFolder of rootFolders) {
  //     const rootFolderPath = path.join(this.rootDirectory, rootFolder);
  //     const subfolderPath = this.findFolderPath(folderId, rootFolderPath);
  
  //     if (subfolderPath) {
  //       return subfolderPath;
  //     }
  //   }
  
  //   return undefined;
  // }
  

  private findFolderPath(folderId: string): string | undefined {
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
  }
  
  
  
  

  getFolderContents(folderId: string): string[] {
    const folderPath = path.join(this.rootDirectory, folderId);
    return fs.readdirSync(folderPath);
  }
}
