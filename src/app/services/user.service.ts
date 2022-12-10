import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { User } from '../shared/models/User';
import {
  LOGIN_URL,
  LOGOUT_URL,
  REGISTER_URL,
  UPDATE_PROFILE_URL,
} from '../shared/constants/urls';
import { ToastService } from './toast.service';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { IUserProfile } from '../shared/interfaces/IUserProfile';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUser());
  public userObservable: Observable<User>;

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private router: Router
  ) {
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
    // first remove user object and delete user object from localStorage
    this.userSubject.next(new User());
    localStorage.removeItem('_user');

    // next - remove JWT cookie token
    this.http.get<string>(LOGOUT_URL).pipe(
      tap({
        next: () => {
          // last reload page
          window.location.reload();
        },
        error: (error) => {
          this.toastService.showErrorToast('Error', error.message);
          // reload page
          window.location.reload();
        },
      })
    );

    // redirect to home
    this.router.navigateByUrl('/');
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

  saveProfile(user: IUserProfile): Observable<IUserProfile> {
    return this.http.post<IUserProfile>(UPDATE_PROFILE_URL, user);
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

  public get currentUser(): User {
    return this.userSubject.value;
  }
}
