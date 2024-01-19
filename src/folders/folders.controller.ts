import { Controller, Get, Post, Req, Res, Param, Body, UseInterceptors, UploadedFile} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { FoldersService,MulterFile } from './folders.service';

@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Post()
  createFolder(@Body() body: { folderName: string }, @Req() req: Request, @Res() res: Response): void {
    try{
      const folderName = this.foldersService.createFolder(body.folderName);
      res.status(200).json({message : 'Folder Created Sucessfully!!!', folderName});
    }catch(error)
    {
      console.error(error);
      res.status(500).json
      ({
        data: {},
        message: 'Error while Creating the Folder!!!',
        success: false,
        err: error.message
      });
    }
  }

  @Post(':folderId/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: MulterFile, @Param('folderId') folderId: string, @Req() req: Request, @Res() res: Response): void {
    try {
      this.foldersService.uploadFile(folderId, file);
      res.status(200).json({ message: 'Image Uploaded successfully!!!'});
    } catch (error) {
      console.error(error);
      res.status(500).json
      ({ 
        data: {},
        message: 'Error while uploading the Image!!!',
        success: false,
        err: error.message
      });
    }
  }

  @Post(':parentFolderId/subfolders')
  createSubfolder(@Body() body: { subfolderName: string }, @Param('parentFolderId') parentFolderId: string, @Req() req: Request, @Res() res: Response): void {
    try{
      const subFolderName = this.foldersService.createSubfolder(parentFolderId, body.subfolderName);
      res.status(200).json({message: 'Folder Created Sucessfully!!!', subFolderName});
    }catch(error){
      console.error(error);
      res.status(500).json
      ({
        data: {},
        message: 'Error while Creating the Folder!!!',
        success: false,
        err: error.message
      });
    }
  }

  @Get(':folderId/contents')
  getFolderContents(@Param('folderId') folderId: string, @Req() req : Request, @Res() res: Response): void {
    try{
      const contents = this.foldersService.getFolderContents(folderId);
      res.status(200).json({ message: 'Content Fetched Sucessfully!!!', contents });
    }catch(error)
    {
      console.error(error);
      res.status(500).json
      ({ 
        data: {},
        message: 'Error Occured while fetching Content!!!',
        success: false,
        err:error.message
      });
    }
  }
}

