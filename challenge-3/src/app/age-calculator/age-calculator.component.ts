import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgeCalculatorService } from './age-calculator.service';

@Component({
  selector: 'app-age-calculator',
  templateUrl: './age-calculator.component.html',
  styleUrls: ['./age-calculator.component.css'],
})
export class AgeCalculatorComponent {
  ageForm: FormGroup;
  ageResult: string | undefined;

  constructor(private formBuilder: FormBuilder, private ageCalculatorService: AgeCalculatorService) {
    this.ageForm = this.formBuilder.group({
      dob: ['02/10/1983', Validators.required],
    });
  }

  calculateAge() {
    const dob = this.ageForm.get('dob')?.value;
    // Parse the date of birth
    const age = this.ageCalculatorService.parseAge(dob);
    // Calculate the duration from the parsed date to the current date
    const duration = this.ageCalculatorService.calculateDuration(age, new Date());
    // Format the duration into a string
    this.ageResult = this.ageCalculatorService.formatDuration(duration);
  }
}
