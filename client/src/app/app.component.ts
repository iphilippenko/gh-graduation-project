import {Component, OnInit} from '@angular/core';
import {filter, mergeMap} from 'rxjs/operators';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.onAuthChange();
  }

  private onAuthChange() {
    this.authService.authChange$.pipe(
      filter(val => val),
      mergeMap(() => this.authService.userInfo())
    ).subscribe(user => {
      this.authService.currentUser = user;
      this.authService.userInfo$.next(user);
    });
  }

}
