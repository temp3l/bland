import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid';
import { AzureService } from '../azure/azure.service';
import { UpdateBlobFileDto } from './dto/update-blob-file.dto';
import { BlobFile, BlobFileDocument } from './entities/blob-file.entity';

/* TODO:
 * explicit return types
 * use typeorm + repositories
 * use logger
 */

@Injectable()
export class BlobFileService {
  constructor(
    @InjectModel(BlobFile.name)
    private readonly blobFileModel: Model<BlobFileDocument>,
    private readonly azureService: AzureService,
  ) {}

  /**
   * Find BlobFiles based on provided filter
   * @param filter - Filtering criteria
   * @returns Promise<BlobFile[]> - Array of matching BlobFiles
   */
  find(filter: UpdateBlobFileDto) {
    return this.blobFileModel.find(filter).exec();
  }

  /**
   * Find a BlobFile by its ID
   * @param id - ID of the BlobFile
   * @returns Promise<BlobFile | null> - Found BlobFile or null if not found
   */
  findOne(id: string) {
    return this.blobFileModel.findById(id).exec();
  }

  /**
   * Remove BlobFiles
   * @param id - ID of the BlobFile to remove (optional)
   */
  remove(id?: string) {
    if (!id) return this.blobFileModel.deleteMany({});
    return this.blobFileModel.deleteMany({ id }).exec();
  }

  /**
   * Get a readable stream for downloading a blob from Azure Blob Storage
   * @param name - Name of the blob to download
   * @returns Promise<Readable> - Readable stream of the blob's content
   */
  getBlobStream(name: string): Promise<Readable> {
    return this.azureService.getBlobStream(name);
  }

  /**
   * Process file upload
   * @param file - Uploaded file object
   * @param sourceIP - Source IP address of the upload
   * @returns Promise<BlobFile> - Created BlobFile entity
   */
  async processFile(file: any, sourceIP: string) {
    console.log(`Processing file upload: ${file.originalname}`);
    try {
      const filePath = `${file.originalname}-${uuidv4()}`;
      const blobUrl = await this.azureService.upload(filePath, file.buffer);
      const result = await this.blobFileModel.create({
        fileName: file.originalname,
        size: file.size,
        contentType: file.mimetype,
        filenameExtension: file.originalname.split('.').pop(),
        sourceIP,
        filePath,
        blobUrl,
      });
      console.log(`Mongodb create result`, result);
      return result;
    } catch (err) {
      console.log('Error processing file', err);
      throw err;
    }
  }
}
