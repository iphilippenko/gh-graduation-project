import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {IUser} from '../interfaces/user.interface';

type LoginResponseType = IUser & { access_token: string };

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userInfo$: BehaviorSubject<IUser | null> = new BehaviorSubject(this.getUser());
  public authChange$: BehaviorSubject<boolean> = new BehaviorSubject(this.isAuthenticated());
  public currentUser: IUser;

  constructor(private http: HttpClient,
              private cookie: CookieService) {
  }

  public getToken(): string | null {
    return this.cookie.check('access_token') ? this.cookie.get('access_token') : null;
  }

  public getUser(): IUser | null {
    return this.cookie.check('user') ? JSON.parse(this.cookie.get('user')) : null;
  }

  public isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  private setUser(token?, user?) {
    const dataToSet = token && user ? user : null;
    this.currentUser = dataToSet;
    this.userInfo$.next(dataToSet);
    if (dataToSet) {
      this.cookie.set('access_token', token);
      this.cookie.set('user', JSON.stringify(dataToSet));
    } else {
      this.cookie.delete('access_token');
      this.cookie.delete('user');
    }
    this.authChange$.next(dataToSet !== null);
  }

  public logout() {
    this.setUser();
  }

  public login(loginData): Observable<IUser> {
    return this.http.post('users/login', loginData)
      .pipe(
        tap(({access_token, ...user}: LoginResponseType) => {
          this.setUser(access_token, user);
          return user;
        }),
        map((user: IUser) => user)
      );
  }

  public register(registerData): Observable<IUser> {
    return this.http.post('users/register', registerData)
      .pipe(
        map((user: IUser) => user));
  }

  public userInfo() {
    return this.http.get('users/info')
      .pipe(
        tap((user: IUser) => {
          this.cookie.set('user', JSON.stringify(user));
        }),
        map((user: IUser) => user));
  }

  public updateUserInfo(data) {
    return this.http.put('users', {...data, userName: this.currentUser.userName})
      .pipe(
        map((user: IUser) => user));
  }

}
