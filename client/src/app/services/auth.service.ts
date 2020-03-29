import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IUser} from '../interfaces/user.interface';

type LoginResponseType = IUser & { token: string };

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authChange$: BehaviorSubject<IUser | null> = new BehaviorSubject(this.getUser());
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

  public login(loginData): Observable<IUser> {
    return this.http.post('user/login', loginData)
      .pipe(
        map(({token, ...user}: LoginResponseType) => {
          this.cookie.set('token', token);
          this.cookie.set('user', JSON.stringify(user));
          this.currentUser = user;
          this.authChange$.next(user);
          return user;
        }));
  }

  public register(registerData): Observable<IUser> {
    return this.http.post('user/register', registerData)
      .pipe(
        map((user: IUser) => user));
  }

}
