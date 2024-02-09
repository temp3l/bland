import { Injectable, OnModuleInit } from '@nestjs/common';
import { AzureService } from './azure.service';

@Injectable()
export class AzureModuleInitializer implements OnModuleInit {
  private initialized = false;

  constructor(private readonly azureService: AzureService) {}

  async onModuleInit(): Promise<void> {
    if (!this.initialized) {
      console.log('############  INIT');
      await this.azureService.initialize();
      this.initialized = true;
    }
  }
}
