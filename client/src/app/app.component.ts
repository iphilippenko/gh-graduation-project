import {Component, OnDestroy, OnInit} from '@angular/core';
import {filter, mergeMap, takeUntil} from 'rxjs/operators';
import {AuthService} from './services/auth.service';
import {ChatService} from './services/chat.service';
import {Subject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribeAll = new Subject();
  constructor(private authService: AuthService,
              public chatService: ChatService) {
  }

  ngOnInit(): void {
    this.onAuthChange();
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  private onAuthChange() {
    this.authService.authChange$.pipe(
      filter(val => val),
      mergeMap(() => this.authService.userInfo()),
      takeUntil(this.unsubscribeAll)
    ).subscribe(user => {
      this.getChatList();
      this.authService.currentUser = user;
      this.authService.userInfo$.next(user);
    });
  }

  private getChatList() {
    this.chatService.getChatList()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe();
  }

}
