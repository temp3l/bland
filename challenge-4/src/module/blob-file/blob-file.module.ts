import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import forFeatureDb from '../../db/for-features.db';
import { AzureModule } from '../azure/azure.module';
import { AzureModuleInitializer } from '../azure/azure.module-initializer';
import { AzureService } from '../azure/azure.service';
import { BlobFileController } from './blob-file.controller';
import { BlobFileService } from './blob-file.service';

@Module({
  imports: [MongooseModule.forFeature(forFeatureDb), AzureModule],
  controllers: [BlobFileController],
  providers: [BlobFileService, AzureService, AzureModuleInitializer],
})
export class BlobFileModule {}
