import { parse } from 'date-fns';

import { PlateData } from './Database';

const dropLeadingR = (str: string) => str.replace(/^r/, '');

export const parsePlateData = (line: string): PlateData => {
  const [
    countryOfVehicle,
    regNumber,
    confidenceLevel,
    cameraName,
    date,
    time,
    imageFilename,
  ] = line.split(/[\\/]/).map((l) => l.trim());

  return {
    countryOfVehicle,
    regNumber: dropLeadingR(regNumber),
    confidenceLevel: dropLeadingR(confidenceLevel),
    cameraName: dropLeadingR(cameraName),
    date: parse(`${date}-${time}`, 'yyyyMMdd-HHmm', new Date()),
    dateString: `${date}-${time}`,
    imageFilename,
  };
};
