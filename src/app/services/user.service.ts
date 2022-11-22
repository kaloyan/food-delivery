import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { User } from '../shared/models/User';
import { LOGIN_URL } from '../shared/constants/urls';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(new User());
  public userObservable: Observable<User>;

  constructor(private http: HttpClient, private toastService: ToastService) {
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.userSubject.next(user);

          this.toastService.showSuccessToast(
            'Login Successful',
            `Wellcome ${user.name}`
          );
        },
        error: (err) => {
          this.toastService.showErrorToast('Login Failed', err.error);
        },
      })
    );
  }
}
