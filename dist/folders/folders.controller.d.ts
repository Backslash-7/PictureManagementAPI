import { Request, Response } from 'express';
import { FoldersService, MulterFile } from './folders.service';
export declare class FoldersController {
    private readonly foldersService;
    constructor(foldersService: FoldersService);
    createFolder(body: {
        folderName: string;
    }, req: Request, res: Response): void;
    uploadFile(file: MulterFile, folderId: string, req: Request, res: Response): void;
    createSubfolder(body: {
        subfolderName: string;
    }, parentFolderId: string, req: Request, res: Response): void;
    getFolderContents(folderId: string, req: Request, res: Response): void;
}
