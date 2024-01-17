import { FoldersService } from './folders.service';
export declare class FoldersController {
    private readonly foldersService;
    constructor(foldersService: FoldersService);
    createFolder(body: {
        folderName: string;
    }): string;
    uploadFile(file: any, folderId: string): void;
    createSubfolder(body: {
        subfolderName: string;
    }, parentFolderId: string): string;
    getFolderContents(folderId: string): string[];
}
