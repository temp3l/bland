import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BlobFileController } from './blob-file.controller';
import { BlobFileService } from './blob-file.service';
import { UpdateBlobFileDto } from './dto/update-blob-file.dto';

describe('BlobFileController', () => {
  let controller: BlobFileController;
  let blobFileServiceMock: Partial<BlobFileService>;

  beforeEach(async () => {
    // Mock BlobFileService
    blobFileServiceMock = {
      find: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
    };

    // Initialize NestJS testing module
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlobFileController],
      providers: [{ provide: BlobFileService, useValue: blobFileServiceMock }],
    }).compile();

    // Retrieve instance of BlobFileController
    controller = module.get<BlobFileController>(BlobFileController);
  });

  it('should be defined', () => {
    // Ensure controller is defined
    expect(controller).toBeDefined();
  });

  describe('find', () => {
    it('should return BlobFiles based on filters', async () => {
      // Prepare test data
      const filter: UpdateBlobFileDto = {
        /* provide filter object */
      };
      const expectedBlobFiles = [
        /* provide expected blob files */
      ];

      // Mock the behavior of BlobFileService's find method
      (blobFileServiceMock.find as jest.Mock).mockResolvedValue(
        expectedBlobFiles,
      );

      // Call the controller method
      const result = await controller.find(filter);

      // Verify the result
      expect(result).toEqual(expectedBlobFiles);
      expect(blobFileServiceMock.find).toBeCalledWith(filter);
    });
  });

  describe('findOne', () => {
    it('should return a BlobFile by ID', async () => {
      // Prepare test data
      const id = 'some-id';
      const expectedBlobFile = {
        /* provide expected blob file */
      };

      // Mock the behavior of BlobFileService's findOne method
      (blobFileServiceMock.findOne as jest.Mock).mockResolvedValue(
        expectedBlobFile,
      );

      // Call the controller method
      const result = await controller.findOne(id);

      // Verify the result
      expect(result).toEqual(expectedBlobFile);
      expect(blobFileServiceMock.findOne).toBeCalledWith(id);
    });

    it('should throw NotFoundException if BlobFile not found', async () => {
      // Prepare test data
      const id = 'non-existing-id';

      // Mock the behavior of BlobFileService's findOne method
      (blobFileServiceMock.findOne as jest.Mock).mockResolvedValue(null);

      // Verify that NotFoundException is thrown
      await expect(controller.findOne(id)).rejects.toThrowError(
        NotFoundException,
      );
      expect(blobFileServiceMock.findOne).toBeCalledWith(id);
    });
  });

  // Add similar tests for other controller methods
});
