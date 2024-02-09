/* eslint-disable functional/prefer-immutable-types */
/* eslint-disable functional/no-classes */
import { Client } from 'pg';

export interface PlateData {
  countryOfVehicle: string;
  regNumber: string;
  confidenceLevel: string;
  cameraName: string;
  date: Date;
  dateString: string;
  imageFilename: string;
}

export interface DBConfig {
  user: string;
  password: string;
  host: string;
  port: number;
  database: string;
}

class Database {
  private client: Client;
  private readonly dbConfig = {
    user: 'postgres',
    password: 'mysecretpassword',
    host: 'localhost',
    port: 5432,
    database: 'plates',
  };

  constructor() {
    this.client = new Client(this.dbConfig);
  }

  async connect() {
    try {
      await this.client.connect();
      console.log('Connected to the database');
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
  }

  async disconnect() {
    try {
      await this.client.end();
      console.log('Disconnected from the database');
    } catch (error) {
      console.error('Error disconnecting from the database:', error);
    }
  }

  /**
   * Saves plate data to the database.
   * @param plateData The plate data to be saved.
   * @returns The ID of the inserted row.
   */
  async savePlateData(filePath: string, plateData: PlateData) {
    try {
      const {
        countryOfVehicle,
        regNumber,
        confidenceLevel,
        cameraName,
        date,
        dateString,
        imageFilename,
      } = plateData;

      const query =
        'INSERT INTO plates ("cameraName", "countryOfVehicle", "regNumber", "confidenceLevel", "date", "imageFilename", "filePath", "dateString") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id';
      const result = await this.client.query(query, [
        cameraName,
        countryOfVehicle,
        regNumber,
        confidenceLevel,
        date,
        imageFilename,
        filePath,
        dateString,
      ]);
      return result.rows[0].id;
    } catch (error) {
      console.error('Error saving plate read:', error);
      throw error;
    }
  }

  /**
   * Marks a file as processed in the database.
   * @param filename The filename to be marked as processed.
   */
  async markFileAsProcessed(filename: string) {
    try {
      const query = 'INSERT INTO processed_files (filename) VALUES ($1)';
      await this.client.query(query, [filename]);
      console.log(`Marked ${filename} as processed`);
    } catch (error) {
      console.error('Error marking file as processed:', error);
      throw error;
    }
  }

  /**
   * Marks a file as processed in the database.
   * @param filename The filename to be marked as processed.
   */
  async isFileProcessed(filename: string): Promise<boolean> {
    try {
      const query = 'SELECT COUNT(*) FROM processed_files WHERE filename = $1';
      const result = await this.client.query(query, [filename]);
      return parseInt(result.rows[0].count) > 0;
    } catch (error) {
      console.error('Error checking if file is processed:', error);
      throw error;
    }
  }

  /**
   * Retrieves all camera names from the database.
   * @returns An array of camera names.
   */
  async getAllCameraNames(): Promise<string[]> {
    try {
      const query = 'SELECT DISTINCT "cameraName" FROM plates';
      // const query = 'SELECT * FROM plates';
      const result = await this.client.query(query);
      return result.rows.map((row) => row.cameraName);
    } catch (error) {
      console.error('Error querying all cameras:', error);
      throw error;
    }
  }

  /**
   * Retrieves plate reads within a specified date range and for a specific camera.
   * @param startDate The start date of the date range.
   * @param endDate The end date of the date range.
   * @param cameraName The name of the camera.
   * @returns An array of plate data within the specified date range and camera.
   */
  async getPlateReadsByDateRangeAndCamera(
    startDate: Date,
    endDate: Date,
    cameraName: string,
  ): Promise<PlateData[]> {
    try {
      const query =
        'SELECT * FROM plates WHERE date >= $1 AND date <= $2 AND "cameraName" = $3';
      const result = await this.client.query(query, [
        startDate,
        endDate,
        cameraName,
      ]);
      return result.rows;
    } catch (error) {
      console.error(
        'Error retrieving plate reads by date range and camera:',
        error,
      );
      throw error;
    }
  }

  async initializeTables(): Promise<void> {
    try {
      await this.createPlatesTable();
      await this.createProcessedFilesTable();
      console.log('Database tables initialized.');
    } catch (error) {
      console.error('Error initializing database tables:', error);
      throw error;
    }
  }

  async clearTables(): Promise<void> {
    try {
      await this.clearPlatesTable();
      await this.clearProcessedFilesTable();
      console.log('Database tables cleared.');
    } catch (error) {
      console.error('Error clearing database tables:', error);
      throw error;
    }
  }

  private async createPlatesTable(): Promise<void> {
    try {
      const query = `
        CREATE TABLE IF NOT EXISTS plates (
          "id" SERIAL PRIMARY KEY,
          "cameraName" VARCHAR(255),
          "countryOfVehicle" VARCHAR(255),
          "regNumber" VARCHAR(255),
          "confidenceLevel" VARCHAR(255),
          "date" TIMESTAMP,
          "imageFilename" VARCHAR(255),
          "filePath" VARCHAR(255),
          "dateString" VARCHAR(255)
        )
      `;
      await this.client.query(query);
      console.log('Plates table created.');
    } catch (error) {
      console.error('Error creating plates table:', error);
      throw error;
    }
  }

  private async createProcessedFilesTable(): Promise<void> {
    try {
      const query = `
        CREATE TABLE IF NOT EXISTS processed_files (
          id SERIAL PRIMARY KEY,
          filename VARCHAR(255) UNIQUE
        )
      `;
      await this.client.query(query);
      console.log('Processed files table created.');
    } catch (error) {
      console.error('Error creating processed files table:', error);
      throw error;
    }
  }

  private async clearPlatesTable(): Promise<void> {
    try {
      const query = 'DELETE FROM plates';
      await this.client.query(query);
      console.log('Plates table cleared.');
    } catch (error) {
      console.error('Error clearing plates table:', error);
      throw error;
    }
  }

  private async clearProcessedFilesTable(): Promise<void> {
    try {
      const query = 'DELETE FROM processed_files';
      await this.client.query(query);
      console.log('Processed files table cleared.');
    } catch (error) {
      console.error('Error clearing processed files table:', error);
      throw error;
    }
  }

  async dropAllTables(): Promise<void> {
    try {
      await this.dropPlatesTable();
      await this.dropProcessedFilesTable();
      console.log('All tables dropped.');
    } catch (error) {
      console.error('Error dropping all tables:', error);
      throw error;
    }
  }

  private async dropPlatesTable(): Promise<void> {
    try {
      const query = 'DROP TABLE IF EXISTS plates';
      await this.client.query(query);
      console.log('Plates table dropped.');
    } catch (error) {
      console.error('Error dropping plates table:', error);
      throw error;
    }
  }

  private async dropProcessedFilesTable(): Promise<void> {
    try {
      const query = 'DROP TABLE IF EXISTS processed_files';
      await this.client.query(query);
      console.log('Processed files table dropped.');
    } catch (error) {
      console.error('Error dropping processed files table:', error);
      throw error;
    }
  }
}

export default Database;
