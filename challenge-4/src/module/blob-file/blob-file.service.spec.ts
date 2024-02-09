import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AzureService } from '../azure/azure.service';
import { BlobFileService } from './blob-file.service';
import { UpdateBlobFileDto } from './dto/update-blob-file.dto';
import { BlobFile } from './entities/blob-file.entity';

describe('BlobFileService', () => {
  let service: BlobFileService;
  let azureServiceMock: Partial<AzureService>;
  let blobFileModelMock: Partial<any>;

  beforeEach(async () => {
    // Mock AzureService and Mongoose Model
    azureServiceMock = {
      getBlobStream: jest.fn(),
      upload: jest.fn(),
    };
    blobFileModelMock = {
      find: jest.fn(),
      findById: jest.fn(),
      deleteMany: jest.fn(),
      create: jest.fn(),
    };

    // Initialize NestJS testing module
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlobFileService,
        { provide: AzureService, useValue: azureServiceMock },
        { provide: getModelToken(BlobFile.name), useValue: blobFileModelMock },
        {
          provide: 'AZURE',
          useFactory: async () => {
            const azureService = new AzureService();
            // await azureService.initialize();
            return azureService;
          },
        },
      ],
    }).compile();

    // Retrieve instance of BlobFileService
    service = module.get<BlobFileService>(BlobFileService);
  });

  it('should be defined', () => {
    // Ensure service is defined
    expect(service).toBeDefined();
  });

  describe('find', () => {
    it('should return BlobFiles with given filter', async () => {
      // Prepare test data
      const filter: UpdateBlobFileDto = {
        /* provide filter object */
      };
      const expectedBlobFiles = [
        /* provide expected blob files */
      ];

      // Mock the behavior of Mongoose model's find method
      blobFileModelMock.find.mockResolvedValue(expectedBlobFiles);

      // Call the service method
      const result = await service.find(filter);

      // Verify the result
      expect(result).toEqual(expectedBlobFiles);
      expect(blobFileModelMock.find).toHaveBeenCalledWith(filter);
    });
  });

  describe('findOne', () => {
    it('should return a BlobFile with given ID', async () => {
      // Prepare test data
      const id = 'some-id';
      const expectedBlobFile = {
        /* provide expected blob file */
      };

      // Mock the behavior of Mongoose model's findById method
      blobFileModelMock.findById.mockResolvedValue(expectedBlobFile);

      // Call the service method
      const result = await service.findOne(id);

      // Verify the result
      expect(result).toEqual(expectedBlobFile);
      expect(blobFileModelMock.findById).toHaveBeenCalledWith(id);
    });
  });

  // Add similar tests for remove, getBlobStream, and processFile methods
});
