import { Controller, Get, Post, Req, Res, Param, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { FoldersService, MulterFile } from './folders.service';
import { ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger';

@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Post()
  @ApiBody({ description: 'Root Folder Name', schema: { type: 'object', properties: { folderName: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'Folder Created Successfully' })
  @ApiResponse({ status: 400, description: 'Error while creating the folder' })
  async createFolder(@Body() body: { folderName: string }, @Res() res: Response): Promise<void> {
    try {
      const folderName = await this.foldersService.createFolder(body.folderName);
      res.status(200).json({ message: 'Folder Created Successfully', folderName });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while Creating the Folder', error: error.message });
    }
  }

  @Post(':folderId/upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } }, required: ['file'] } })
  @ApiResponse({ status: 200, description: 'Image Uploaded Successfully' })
  @ApiResponse({ status: 400, description: 'Error while uploading the Image' })
  async uploadFile(@UploadedFile() file: MulterFile, @Param('folderId') folderId: string, @Res() res: Response): Promise<void> {
    try {
      await this.foldersService.uploadFile(folderId, file);
      res.status(200).json({ message: 'Image Uploaded Successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while uploading the Image', error: error.message });
    }
  }

  @Post(':parentFolderId/subfolders')
  @ApiBody({ description: 'Sub Folder Details', schema: { type: 'object', properties: { parentFolderId: { type: 'string' }, subfolderName: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'Sub-Folder Created Successfully' })
  @ApiResponse({ status: 400, description: 'Error while creating the Sub-folder' })
  async createSubfolder(@Body() body: { parentFolderId: string; subfolderName: string }, @Res() res: Response): Promise<void> {
    try {
      const { parentFolderId, subfolderName } = body;
      const subFolderName = await this.foldersService.createSubfolder(parentFolderId, subfolderName);
      res.status(200).json({ message: 'Subfolder Created Successfully', subFolderName });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while Creating the Folder', error: error.message });
    }
  }

  @Get(':folderId/contents')
  @ApiResponse({ status: 200, description: 'Folder Content Fetched Successfully' })
  @ApiResponse({ status: 400, description: 'Error while fetching the Folder Content' })
  async getFolderContents(@Param('folderId') folderId: string, @Res() res: Response): Promise<void> {
    try {
      const contents = await this.foldersService.getFolderContents(folderId);
      res.status(200).json({ message: 'Content Fetched Successfully', contents });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error Occurred while fetching Content', error: error.message });
    }
  }
}
