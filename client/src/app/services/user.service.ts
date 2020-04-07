import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {IUser} from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public search(search: string): Observable<Array<IUser>> {
    return this.http.get('users', {params: {search}})
      .pipe(
        map((users: Array<IUser>) => users));
  }
}
