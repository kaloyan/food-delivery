import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { User } from '../shared/models/User';
import { LOGIN_URL, REGISTER_URL } from '../shared/constants/urls';
import { ToastService } from './toast.service';
import { IUserRegister } from '../shared/interfaces/IUserRegister';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUser());
  public userObservable: Observable<User>;

  constructor(private http: HttpClient, private toastService: ToastService) {
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.saveUser(user);
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

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem('_user');
    window.location.reload();
  }

  register(user: IUserRegister): Observable<User> {
    return this.http.post<User>(REGISTER_URL, user).pipe(
      tap({
        next: (user) => {
          this.saveUser(user);
          this.userSubject.next(user);
          this.toastService.showSuccessToast(
            'Registration Successful',
            `Wellcome ${user.name}`
          );
        },
        error: (err) => {
          this.toastService.showErrorToast('Registration Failed', err.error);
        },
      })
    );
  }

  private saveUser(user: User): void {
    localStorage.setItem('_user', JSON.stringify(user));
  }

  private getUser(): User {
    const userString = localStorage.getItem('_user');

    if (userString) {
      return JSON.parse(userString) as User;
    } else {
      return new User();
    }
  }
}
