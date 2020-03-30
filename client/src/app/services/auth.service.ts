import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {IUser} from '../interfaces/user.interface';

type LoginResponseType = IUser & { token: string };

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
    return this.cookie.check('token') ? this.cookie.get('token') : null;
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
      this.cookie.set('token', token);
      this.cookie.set('user', JSON.stringify(dataToSet));
    } else {
      ['token', 'user'].forEach(el => {
        this.cookie.delete(el);
      });
    }
    this.authChange$.next(dataToSet !== null);
  }

  public logout() {
    this.setUser();
  }

  public login(loginData): Observable<IUser> {
    return this.http.post('user/login', loginData)
      .pipe(
        tap(({token, ...user}: LoginResponseType) => {
          this.setUser(token, user);
          return user;
        }),
        map((user: IUser) => user)
      );
  }

  public register(registerData): Observable<IUser> {
    return this.http.post('user/register', registerData)
      .pipe(
        map((user: IUser) => user));
  }

  public userInfo() {
    return this.http.get('user/info')
      .pipe(
        map((user: IUser) => user));
  }

  public updateUserInfo(data) {
    return this.http.put('user/info', data)
      .pipe(
        map((user: IUser) => user));
  }

}
