import { Injectable } from '@angular/core';
import { intervalToDuration, Duration } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class AgeCalculatorService {
  /**
   * Parses the date of birth (DOB) from a string and returns a Date object.
   *
   * @param dob - A string representing the date of birth in 'dd/mm/yyyy' format.
   * @returns A Date object representing the parsed date of birth.
   */
  parseAge(dob: string): Date {
    const [day, month, year] = `${dob}`.split('/');
    if (!day || !month || !year || isNaN(+day) || isNaN(+month) || isNaN(+year)) {
      throw new Error('Invalid date of birth format. Expected "dd/mm/yyyy".');
    }
    const parsedDate = new Date(`${month}/${day}/${year}`);
    if (isNaN(parsedDate.getTime())) {
      throw new Error('Invalid date of birth format. Expected "dd/mm/yyyy".');
    }
    if (parsedDate.getTime() >= new Date().getTime()) {
      throw new Error('Date of birth is in the future.');
    }
    return parsedDate
  }

  /**
   * Calculates the duration between the provided date and the current date.
   *
   * @param date - A Date object representing the reference date.
   * @param currentDate - A Date object representing the current date. (simplifies testing)
   * @returns A Duration object containing the calculated duration.
   */
  calculateDuration(date: Date, currentDate: Date): Duration {
    return intervalToDuration({ start: date, end: currentDate })
  }

  /**
   * Formats the provided Duration object into a human-readable string representation.
   *
   * @param duration - A Duration object containing the calculated duration.
   * @returns A formatted string representing the age duration.
   */
  formatDuration(duration: Duration): string {
    const { years, months, days, hours, minutes, seconds } = duration;
    const result = `${years} years, ${months} months, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    return result;
  }
}
