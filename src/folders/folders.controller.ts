import { Controller, Get, Post, Param, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FoldersService } from './folders.service';

@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Post()
  createFolder(@Body() body: { folderName: string }) {
    return this.foldersService.createFolder(body.folderName);
  }

  @Post(':folderId/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file, @Param('folderId') folderId: string) {
    return this.foldersService.uploadFile(folderId, file);
  }

  @Post(':parentFolderId/subfolders')
  createSubfolder(@Body() body: { subfolderName: string }, @Param('parentFolderId') parentFolderId: string) {
    return this.foldersService.createSubfolder(parentFolderId, body.subfolderName);
  }

  @Get(':folderId/contents')
  getFolderContents(@Param('folderId') folderId: string) {
    return this.foldersService.getFolderContents(folderId);
  }
}
