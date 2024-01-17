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
    const allowedExtensions = ['.png', '.jpeg'];
    const fileExtension = path.extname(file.originalname).toLowerCase();

    if (allowedExtensions.includes(fileExtension)) {
      const filePath = path.join(this.rootDirectory, folderId, file.originalname);
      fs.writeFileSync(filePath, file.buffer);
    } else {
      throw new Error('Invalid file format. Only PNG and JPEG files are allowed.');
    }
  }

  createSubfolder(parentFolderId: string, subfolderName: string): string {
    const subfolderId = uuidv4();
    const subfolderPath = path.join(this.rootDirectory, parentFolderId, subfolderId);

    fs.mkdirSync(subfolderPath);
    return subfolderId;
  }

  getFolderContents(folderId: string): string[] {
    const folderPath = path.join(this.rootDirectory, folderId);

    return fs.readdirSync(folderPath);
  }
}
