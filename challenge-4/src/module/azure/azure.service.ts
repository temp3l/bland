import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import { Injectable, Logger } from '@nestjs/common';
import { Readable } from 'stream';

@Injectable()
export class AzureService {
  private readonly containerName = `${process.env.AZURE_CONTAINER_NAME}`;
  private readonly logger = new Logger(AzureService.name);
  private blobServiceClient: BlobServiceClient;
  private containerClient: ContainerClient;

  constructor() {
    this.blobServiceClient = BlobServiceClient.fromConnectionString(
      process.env.AZURE_CONNECTION,
    );
  }

  /**
   * creates the azure container if not existing
   */
  async initialize() {
    try {
      // Initialize ContainerClient
      this.containerClient = this.blobServiceClient.getContainerClient(
        this.containerName,
      );

      // Check if container exists, create if not
      const isExistingContainer = await this.containerClient.exists();
      if (!isExistingContainer) {
        await this.containerClient.create();
        this.logger.log(`Created Azure container: ${this.containerName}`);
      } else {
        this.logger.log(
          `Using existing Azure container: ${this.containerName}`,
        );
      }
    } catch (error) {
      console.error('Error initializing AzureService:', error);
      throw error;
    }
  }

  /**
   * Uploads a blob to Azure Blob Storage.
   * @param blobName The name of the blob to upload.
   * @param content The content of the blob as a Buffer.
   * @returns The URL of the uploaded blob.
   */
  async upload(blobName: string, content: Buffer): Promise<string> {
    try {
      const serviceClient = BlobServiceClient.fromConnectionString(
        process.env.AZURE_CONNECTION,
      );
      const containerClient = serviceClient.getContainerClient(
        `${process.env.AZURE_CONTAINER_NAME}`,
      );

      this.logger.log(`Uploading blob: ${blobName}`);

      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      await blockBlobClient.upload(content, content.byteLength);
      this.logger.log(`Uploaded blob: ${blobName}`);
      return blockBlobClient.url;
    } catch (error) {
      this.logger.error(`Error uploading blob: ${error.message}`);
      throw new Error(`Failed to upload blob: ${error.message}`);
    }
  }

  /**
   * Retrieves a readable stream for downloading a blob from Azure Blob Storage.
   * @param blobName The name of the blob to download.
   * @returns A readable stream of the blob's content.
   */
  async getBlobStream(blobName: string): Promise<Readable> {
    try {
      this.logger.log(`Downloading blob: ${blobName}`);
      const downloadBlockBlobResponse = await this.containerClient
        .getBlockBlobClient(blobName)
        .download();
      return Readable.from(downloadBlockBlobResponse.readableStreamBody);
    } catch (error) {
      this.logger.error(`Error downloading blob: ${error.message}`);
      throw new Error(`Failed to download blob: ${error.message}`);
    }
  }

  /**
   * Lists all blobs within the Azure container.
   * @returns An array of blob names.
   */
  async listBlobs(): Promise<string[]> {
    try {
      const blobNames: string[] = [];
      const blobs = this.containerClient.listBlobsFlat();
      for await (const blob of blobs) {
        blobNames.push(blob.name);
      }
      return blobNames;
    } catch (error) {
      this.logger.error(`Error listing blobs: ${error.message}`);
      throw new Error(`Failed to list blobs: ${error.message}`);
    }
  }
}
