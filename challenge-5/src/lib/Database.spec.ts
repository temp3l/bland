/* eslint-disable functional/no-return-void */
import Database, { PlateData } from './Database';

describe('Database', () => {
  // eslint-disable-next-line functional/no-let
  let db: Database;

  beforeAll(async () => {
    db = new Database();
    await db.connect();
    await db.initializeTables();
  });

  afterAll(async () => {
    await db.clearTables();
    await db.disconnect();
  });

  afterEach(async () => {
    await db.clearTables();
  });

  describe('savePlateData', () => {
    it('should save plate data to the database', async () => {
      const plateData: PlateData = {
        countryOfVehicle: 'USA',
        regNumber: 'ABC123',
        confidenceLevel: 'High',
        cameraName: 'Camera1',
        date: new Date(),
        imageFilename: 'image.jpg',
        dateString: '19990827-1210',
      };

      const id = await db.savePlateData('savePlateTest1', plateData);
      expect(id).toBeDefined();
    });
  });

  describe('markFileAsProcessed', () => {
    it('should mark a file as processed', async () => {
      const filename = 'image.jpg';
      await db.markFileAsProcessed(filename);

      const isProcessed = await db.isFileProcessed(filename);
      expect(isProcessed).toBe(true);
    });
    it('should Not mark a file as processed', async () => {
      const isProcessed = await db.isFileProcessed('filename_0000000');
      expect(isProcessed).toBe(false);
    });
  });

  describe('getAllCameraNames', () => {
    it('should retrieve all camera names from the database', async () => {
      // Prepare data
      await db.savePlateData('savePlateTest2', {
        countryOfVehicle: 'USA',
        regNumber: 'ABC123',
        confidenceLevel: 'High',
        cameraName: 'Camera1',
        date: new Date(),
        imageFilename: 'image.jpg',
        dateString: '19990827-1210',
      });
      await db.savePlateData('savePlateTest3', {
        countryOfVehicle: 'USA',
        regNumber: 'DEF456',
        confidenceLevel: 'Medium',
        cameraName: 'Camera2',
        date: new Date(),
        imageFilename: 'image.jpg',
        dateString: '19990827-1210',
      });

      // Perform test
      const cameraNames = await db.getAllCameraNames();
      expect(cameraNames).toContain('Camera1');
      expect(cameraNames).toContain('Camera2');
    });
  });

  describe('getPlateReadsByDateRangeAndCamera', () => {
    it('should retrieve plate reads within a specified date range and camera', async () => {
      // Prepare data
      const startDate = new Date('2023-01-01');
      const endDate = new Date('2023-12-31');
      await db.savePlateData('savePlateTest4', {
        countryOfVehicle: 'USA',
        regNumber: 'ABC123',
        confidenceLevel: 'High',
        cameraName: 'savePlateTest4',
        date: new Date('2023-05-01'),
        imageFilename: 'image.jpg',
        dateString: '19990827-1210',
      });

      // Perform test
      const plateReads = await db.getPlateReadsByDateRangeAndCamera(
        startDate,
        endDate,
        'savePlateTest4',
      );
      expect(plateReads.length).toBe(1);
    });
  });
});
