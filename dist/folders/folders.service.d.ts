/// <reference types="node" />
export interface MulterFile {
    originalname: string;
    buffer: Buffer;
}
export declare class FoldersService {
    private rootDirectory;
    createFolder(folderName: string): string;
    private folderExists;
    uploadFile(folderId: string, file: MulterFile): void;
    createSubfolder(parentFolderId: string, subfolderName: string): string;
    private findFolderPath;
    getFolderContents(folderId: string): string[];
    private readFolder;
}
