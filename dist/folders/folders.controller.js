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
let FoldersController = class FoldersController {
    constructor(foldersService) {
        this.foldersService = foldersService;
    }
    createFolder(body, req, res) {
        try {
            const folderName = this.foldersService.createFolder(body.folderName);
            res.status(200).json({ message: 'Folder Created Sucessfully!!!', folderName });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                data: {},
                message: 'Error while Creating the Folder!!!',
                success: false,
                err: error.message
            });
        }
    }
    uploadFile(file, folderId, req, res) {
        try {
            this.foldersService.uploadFile(folderId, file);
            res.status(200).json({ message: 'Image Uploaded successfully!!!' });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                data: {},
                message: 'Error while uploading the Image!!!',
                success: false,
                err: error.message
            });
        }
    }
    createSubfolder(body, parentFolderId, req, res) {
        try {
            const subFolderName = this.foldersService.createSubfolder(parentFolderId, body.subfolderName);
            res.status(200).json({ message: 'Folder Created Sucessfully!!!', subFolderName });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                data: {},
                message: 'Error while Creating the Folder!!!',
                success: false,
                err: error.message
            });
        }
    }
    getFolderContents(folderId, req, res) {
        try {
            const contents = this.foldersService.getFolderContents(folderId);
            res.status(200).json({ message: 'Content Fetched Sucessfully!!!', contents });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                data: {},
                message: 'Error Occured while fetching Content!!!',
                success: false,
                err: error.message
            });
        }
    }
};
exports.FoldersController = FoldersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], FoldersController.prototype, "createFolder", null);
__decorate([
    (0, common_1.Post)(':folderId/upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)('folderId')),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, Object]),
    __metadata("design:returntype", void 0)
], FoldersController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)(':parentFolderId/subfolders'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('parentFolderId')),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, Object]),
    __metadata("design:returntype", void 0)
], FoldersController.prototype, "createSubfolder", null);
__decorate([
    (0, common_1.Get)(':folderId/contents'),
    __param(0, (0, common_1.Param)('folderId')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], FoldersController.prototype, "getFolderContents", null);
exports.FoldersController = FoldersController = __decorate([
    (0, common_1.Controller)('folders'),
    __metadata("design:paramtypes", [folders_service_1.FoldersService])
], FoldersController);
//# sourceMappingURL=folders.controller.js.map