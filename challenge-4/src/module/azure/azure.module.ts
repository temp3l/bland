import { Module } from '@nestjs/common';
import { AzureService } from './azure.service';
// import { AzureModuleInitializer } from './azure.module-initializer';

@Module({
  imports: [],
  controllers: [],
  providers: [AzureService],
  exports: [AzureService],
})
export class AzureModule {}
