"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoldersController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const folders_service_1 = require("./folders.service");
const swagger_1 = require("@nestjs/swagger");
let FoldersController = class FoldersController {
    constructor(foldersService) {
        this.foldersService = foldersService;
    }
    async createFolder(body, res) {
        try {
            const folderName = await this.foldersService.createFolder(body.folderName);
            res.status(200).json({ message: 'Folder Created Successfully', folderName });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error while Creating the Folder', error: error.message });
        }
    }
    async uploadFile(file, folderId, res) {
        try {
            await this.foldersService.uploadFile(folderId, file);
            res.status(200).json({ message: 'Image Uploaded Successfully' });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error while uploading the Image', error: error.message });
        }
    }
    async createSubfolder(body, res) {
        try {
            const { parentFolderId, subfolderName } = body;
            const subFolderName = await this.foldersService.createSubfolder(parentFolderId, subfolderName);
            res.status(200).json({ message: 'Subfolder Created Successfully', subFolderName });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error while Creating the Folder', error: error.message });
        }
    }
    async getFolderContents(folderId, res) {
        try {
            const contents = await this.foldersService.getFolderContents(folderId);
            res.status(200).json({ message: 'Content Fetched Successfully', contents });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error Occurred while fetching Content', error: error.message });
        }
    }
};
exports.FoldersController = FoldersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({ description: 'Root Folder Name', schema: { type: 'object', properties: { folderName: { type: 'string' } } } }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Folder Created Successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Error while creating the folder' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FoldersController.prototype, "createFolder", null);
__decorate([
    (0, common_1.Post)(':folderId/upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } }, required: ['file'] } }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Image Uploaded Successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Error while uploading the Image' }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)('folderId')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], FoldersController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)(':parentFolderId/subfolders'),
    (0, swagger_1.ApiBody)({ description: 'Sub Folder Details', schema: { type: 'object', properties: { parentFolderId: { type: 'string' }, subfolderName: { type: 'string' } } } }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Sub-Folder Created Successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Error while creating the Sub-folder' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FoldersController.prototype, "createSubfolder", null);
__decorate([
    (0, common_1.Get)(':folderId/contents'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Folder Content Fetched Successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Error while fetching the Folder Content' }),
    __param(0, (0, common_1.Param)('folderId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FoldersController.prototype, "getFolderContents", null);
exports.FoldersController = FoldersController = __decorate([
    (0, common_1.Controller)('folders'),
    __metadata("design:paramtypes", [folders_service_1.FoldersService])
], FoldersController);
//# sourceMappingURL=folders.controller.js.map