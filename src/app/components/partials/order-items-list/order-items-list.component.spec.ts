import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Order } from 'src/app/shared/models/Order';

import { OrderItemsListComponent } from './order-items-list.component';

describe('OrderItemsListComponent', () => {
  let component: OrderItemsListComponent;
  let fixture: ComponentFixture<OrderItemsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderItemsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderItemsListComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    component.order = new Order();
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
