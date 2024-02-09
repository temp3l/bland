import { PartialType } from '@nestjs/swagger';
import { BlobFileDto } from './blob-file.dto';

export class UpdateBlobFileDto extends PartialType(BlobFileDto) {}
