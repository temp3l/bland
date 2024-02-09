import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AgeCalculatorComponent } from './age-calculator.component';

@NgModule({
  declarations: [AgeCalculatorComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [AgeCalculatorComponent],
})
export class AgeCalculatorModule {}
