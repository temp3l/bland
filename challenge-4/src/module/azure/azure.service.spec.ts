import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { streamToText } from '../../utilities/stream-utils';
import { AzureService } from './azure.service';

describe('AzureService', () => {
  let service: AzureService;
  // TODO: add binary file from fixtures
  const files = [
    {
      name: uuidv4(),
      content: uuidv4(),
    },
    {
      name: uuidv4(),
      content: uuidv4(),
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AzureService],
    }).compile();

    service = module.get<AzureService>(AzureService);
    await service.initialize();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('upload', () => {
    it('should upload files without throwing an error', async () => {
      await expect(
        service.upload(files[0].name, Buffer.from(files[0].content)),
      ).resolves.not.toThrow();
      await expect(
        service.upload(files[1].name, Buffer.from(files[1].content)),
      ).resolves.not.toThrow();
    });
  });

  describe('listBlobs', () => {
    it('should list uploaded files without throwing', async () => {
      const blobList = await service.listBlobs();
      expect(blobList).toEqual(
        expect.arrayContaining([files[0].name, files[1].name]),
      );
    });
  });

  describe('getBlobStream', () => {
    it('should download text content correctly', async () => {
      const streams = await Promise.all(
        files.map((file) => service.getBlobStream(file.name)),
      );
      const contents = await Promise.all(streams.map(streamToText));

      expect(contents).toEqual(files.map((file) => file.content));
      console.log(contents);
    });
  });
});
