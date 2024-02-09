import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { RealIP } from 'nestjs-real-ip';
import { ParseObjectIdPipe } from '../../utilities/parse-object-id-pipe.pipe';
import { BlobFileService } from './blob-file.service';
import { UpdateBlobFileDto } from './dto/update-blob-file.dto';
import { BlobFileDocument } from './entities/blob-file.entity';

// TODO: better DTOs

@Controller()
export class BlobFileController {
  constructor(private readonly blobFileService: BlobFileService) {}

  /**
   * Endpoint to find blob files based on filters.
   * @param query Filter parameters.
   * @returns A list of blob files matching the filter criteria.
   */
  @Get()
  async find(@Query() query: UpdateBlobFileDto): Promise<UpdateBlobFileDto[]> {
    return this.blobFileService.find(query);
  }

  /**
   * Endpoint to find a single blob file by its ID.
   * @param id The ID of the blob file.
   * @returns The blob file with the specified ID.
   */
  @Get(':id')
  async findOne(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<UpdateBlobFileDto> {
    const blobFile = await this.blobFileService.findOne(id);
    if (!blobFile) {
      throw new NotFoundException(`Blob file with ID ${id} not found`);
    }
    return this.blobFileService.findOne(id);
  }

  /**
   * Endpoint to upload a file.
   * @param file The file to upload.
   * @param sourceIP The IP address of the client.
   * @returns The uploaded blob file.
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('fileName'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @RealIP() sourceIP: string,
  ): Promise<UpdateBlobFileDto> {
    return this.blobFileService.processFile(file, sourceIP);
  }

  /**
   * Endpoint to download a blob file.
   * @param id The ID of the blob file to download.
   * @param res The response object to send the file data.
   */
  @Get('/download/:id')
  async downloadBlob(
    @Param('id', ParseObjectIdPipe) id: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const doc: BlobFileDocument = await this.blobFileService.findOne(id);
      if (!doc) {
        throw new NotFoundException(`No such MongoDB id: ${id}`);
      }

      const blobStream = await this.blobFileService.getBlobStream(doc.filePath);

      res.set({
        'Content-Type': doc.contentType,
        'Content-Disposition': `attachment; filename="${doc.fileName}"`,
      });

      blobStream.pipe(res);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-throw NotFoundException to handle it globally
      }
      throw new NotFoundException(`Error downloading file: ${error.message}`);
    }
  }

  /**
   * Removes a blob file by its ID.
   * @param id The ID of the blob file to remove.
   */
  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id?: string) {
    return this.blobFileService.remove(id);
  }
}
