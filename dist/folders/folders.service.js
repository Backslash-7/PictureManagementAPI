"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoldersService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const fs = require("fs");
const path = require("path");
let FoldersService = class FoldersService {
    constructor() {
        this.rootDirectory = path.join(__dirname, '..', '..', 'uploads');
    }
    createFolder(folderName) {
        const folderId = (0, uuid_1.v4)();
        const folderPath = path.join(this.rootDirectory, folderId);
        fs.mkdirSync(folderPath, { recursive: true });
        return folderId;
    }
    uploadFile(folderId, file) {
        const allowedExtensions = ['.png', '.jpeg', '.jpg'];
        const fileExtension = path.extname(file.originalname).toLowerCase();
        if (allowedExtensions.includes(fileExtension)) {
            const parentFolderPath = this.findFolderPath(folderId);
            if (!parentFolderPath) {
                throw new Error(`Parent folder with ID ${folderId} does not exist.`);
            }
            const filePath = path.join(parentFolderPath, file.originalname);
            fs.writeFileSync(filePath, file.buffer);
        }
        else {
            throw new Error('Invalid file format. Only PNG, JPG and JPEG files are allowed.');
        }
    }
    createSubfolder(parentFolderId, subfolderName) {
        try {
            const subfolderId = (0, uuid_1.v4)();
            const parentFolderPath = this.findFolderPath(parentFolderId);
            if (!parentFolderPath) {
                throw new Error(`Parent folder with ID ${parentFolderId} does not exist.`);
            }
            const subfolderPath = path.join(parentFolderPath, subfolderId);
            fs.mkdirSync(subfolderPath, { recursive: true });
            return subfolderId;
        }
        catch (error) {
            throw new Error(`Error creating subfolder: ${error.message}`);
        }
    }
    findFolderPath(folderId) {
        try {
            const stack = [this.rootDirectory];
            while (stack.length > 0) {
                const currentPath = stack.pop();
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
        catch (error) {
            throw new Error(`Error finding folder path: ${error.message}`);
        }
    }
    getFolderContents(folderId) {
        const rootFolderPath = path.join(this.rootDirectory);
        if (!fs.existsSync(rootFolderPath)) {
            throw new Error(`Root folder not found: ${rootFolderPath}`);
        }
        return this.readFolderRecursive(rootFolderPath, folderId);
    }
    readFolderRecursive(folderPath, targetFolderId) {
        const contents = [];
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
        }
        catch (error) {
            throw new Error(`Error reading folder contents: ${error.message}`);
        }
        return contents;
    }
};
exports.FoldersService = FoldersService;
exports.FoldersService = FoldersService = __decorate([
    (0, common_1.Injectable)()
], FoldersService);
//# sourceMappingURL=folders.service.js.map