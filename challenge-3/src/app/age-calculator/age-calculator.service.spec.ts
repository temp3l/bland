import { TestBed } from '@angular/core/testing';
import { AgeCalculatorService } from './age-calculator.service';

describe('AgeCalculatorService', () => {
  let service: AgeCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgeCalculatorService],
    });
    service = TestBed.inject(AgeCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('parseAge', () => {
    it('should parse the date of birth correctly', () => {
      const dob = '31/01/1990';
      const parsedDate = service.parseAge(dob);
      const expectedDate = new Date(1990, 0, 31);
      expect(parsedDate).toEqual(expectedDate);
    });

    it('should throw an error for invalid date format', () => {
      const invalidDob = '31-01-1990'; // Invalid format
      expect(() => service.parseAge(invalidDob)).toThrowError('Invalid date of birth format. Expected "dd/mm/yyyy".');
    });
  });

  describe('calculateDuration', () => {
    it('should calculate the duration between the provided date and the current date', () => {
      const referenceDate = new Date(1983, 11, 2, 0, 0, 0);
      const currentDate = new Date(2024, 3, 3, 1, 1, 1);
      const duration = service.calculateDuration(referenceDate, currentDate);
      expect(duration).toEqual({years: 40, months: 4, days: 1, hours: 1, minutes: 1, seconds: 1});
    });
  });

  describe('formatDuration', () => {
    it('should format the duration into a human-readable string', () => {
      const duration = { years: 1, months: 6, days: 15, hours: 12, minutes: 30, seconds: 45 };
      const formattedString = service.formatDuration(duration);
      const expectedString = '1 years, 6 months, 15 days, 12 hours, 30 minutes, 45 seconds';
      expect(formattedString).toEqual(expectedString);
    });
  });
});
