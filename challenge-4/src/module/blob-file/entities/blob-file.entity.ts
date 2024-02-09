import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlobFileDocument = BlobFile & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class BlobFile {
  @Prop({ required: true })
  fileName: string;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true })
  contentType: string;

  @Prop({ required: false })
  filenameExtension: string;

  @Prop({ required: true })
  sourceIP: string;

  @Prop({ required: true })
  filePath: string;

  @Prop({ required: true })
  blobUrl: string;
}

export const BlobFileSchema = SchemaFactory.createForClass(BlobFile);
