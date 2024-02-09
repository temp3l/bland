export class BlobFileDto {
  id: string;
  fileName: string;
  size: number;
  contentType: string;
  filenameExtension: string;
  sourceIP: string;
  filePath: string;
  blobUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}
