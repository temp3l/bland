import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeCalculatorComponent } from './age-calculator.component';
import { AgeCalculatorModule } from './age-calculator.module';

describe('AgeCalculatorComponent', () => {
  let component: AgeCalculatorComponent;
  let fixture: ComponentFixture<AgeCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgeCalculatorModule],
      declarations: [AgeCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgeCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
