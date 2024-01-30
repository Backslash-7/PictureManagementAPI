import { Response } from 'express';
import { FoldersService, MulterFile } from './folders.service';
export declare class FoldersController {
    private readonly foldersService;
    constructor(foldersService: FoldersService);
    createFolder(body: {
        folderName: string;
    }, res: Response): Promise<void>;
    uploadFile(file: MulterFile, folderId: string, res: Response): Promise<void>;
    createSubfolder(body: {
        parentFolderId: string;
        subfolderName: string;
    }, res: Response): Promise<void>;
    getFolderContents(folderId: string, res: Response): Promise<void>;
}
