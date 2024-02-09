import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import {AgeCalculatorModule} from './age-calculator/age-calculator.module'

@Component({
  selector: 'app-root',
  standalone: true,
  // imports: [RouterOutlet],
  imports: [AgeCalculatorModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'challenge-3';
}
