import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../shared/models/Order';
import { MY_ORDERS_URL, ORDER_CREATE_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  create(order: Order) {
    return this.http.post<Order>(ORDER_CREATE_URL, order);
  }

  getMyOrders(): Observable<Order> {
    return this.http.get<Order>(MY_ORDERS_URL);
  }
}
