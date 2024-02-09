/* eslint-disable functional/no-loop-statements */
import fs from 'fs';
import { promisify } from 'util';

import Database, { PlateData } from './lib/Database';
import { parsePlateData } from './lib/parser';
import { scanner } from './lib/scanner';

const readFile = promisify(fs.readFile);

const processFile = async (filePath: string) => {
  const fileContents: string = await readFile(filePath, 'utf-8');
  const plateData: PlateData = parsePlateData(fileContents);
  return plateData;
};

(async () => {
  const db = new Database();
  await db.connect();
  //await db.dropAllTables();
  await db.initializeTables();
  // await db.clearTables();
  const files = await scanner('./cams/**/*.lpr'); //.slice(0, 4);
  for (const filePath of files) {
    const plate = await processFile(filePath);
    const isFileProcessed = await db.isFileProcessed(filePath);
    if (!isFileProcessed) {
      await db.savePlateData(filePath, plate);
      await db.markFileAsProcessed(filePath);
    } else {
      console.log(`File already processed: ${filePath}`);
    }
  }
})();

/*
  // Query example:
    const result = await db.getPlateReadsByDateRangeAndCamera(
      new Date('2014-08-27T12:10:01'),
      new Date('2014-08-27T12:10:01'),
      'GIBEXIT2',
    );
    const cameraNames = await db.getAllCameraNames();
    console.log({
      result,
      cameraNames,
      resultLength: result.length,
      d: new Date(),
      iso: new Date().toISOString(),
    });
  */
