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
        this.rootDirectory = path.join(__dirname, 'uploads');
    }
    createFolder(folderName) {
        const folderId = (0, uuid_1.v4)();
        const folderPath = path.join(this.rootDirectory, folderId);
        fs.mkdirSync(folderPath);
        return folderId;
    }
    uploadFile(folderId, file) {
        const allowedExtensions = ['.png', '.jpeg'];
        const fileExtension = path.extname(file.originalname).toLowerCase();
        if (allowedExtensions.includes(fileExtension)) {
            const filePath = path.join(this.rootDirectory, folderId, file.originalname);
            fs.writeFileSync(filePath, file.buffer);
        }
        else {
            throw new Error('Invalid file format. Only PNG and JPEG files are allowed.');
        }
    }
    createSubfolder(parentFolderId, subfolderName) {
        const subfolderId = (0, uuid_1.v4)();
        const subfolderPath = path.join(this.rootDirectory, parentFolderId, subfolderId);
        fs.mkdirSync(subfolderPath);
        return subfolderId;
    }
    getFolderContents(folderId) {
        const folderPath = path.join(this.rootDirectory, folderId);
        return fs.readdirSync(folderPath);
    }
};
exports.FoldersService = FoldersService;
exports.FoldersService = FoldersService = __decorate([
    (0, common_1.Injectable)()
], FoldersService);
//# sourceMappingURL=folders.service.js.map