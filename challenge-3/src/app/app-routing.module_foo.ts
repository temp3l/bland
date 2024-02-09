import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgeCalculatorComponent } from './age-calculator/age-calculator.component';

const routes: Routes = [
  { path: 'age', component: AgeCalculatorComponent },
  { path: '', redirectTo: '/age', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
