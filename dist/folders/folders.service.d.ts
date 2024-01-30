/// <reference types="node" />
export interface MulterFile {
    originalname: string;
    buffer: Buffer;
}
export declare class FoldersService {
    private rootDirectory;
    createFolder(folderName: string): Promise<string>;
    private folderExists;
    uploadFile(folderId: string, file: MulterFile): Promise<void>;
    createSubfolder(parentFolderId: string, subfolderName: string): Promise<string>;
    private findFolderPath;
    getFolderContents(folderId: string): string[];
    private readFolder;
}
