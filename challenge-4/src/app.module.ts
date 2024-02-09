import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AzureModule } from './module/azure/azure.module';
import { AzureService } from './module/azure/azure.service';
import { BlobFileModule } from './module/blob-file/blob-file.module';
// import { AzureModuleInitializer } from './azure/azure.module-initializer';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/nest'),
    AzureModule,
    BlobFileModule,
  ],
  controllers: [],
  providers: [AzureService],
})
export class AppModule {}
