import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Food } from 'src/app/shared/models/Food';

import { FoodItemComponent } from './food-item.component';

describe('FoodItemComponent', () => {
  let component: FoodItemComponent;
  let fixture: ComponentFixture<FoodItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoodItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FoodItemComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    component.food = new Food();
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
