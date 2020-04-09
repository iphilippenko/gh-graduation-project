import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {UserService} from '../../services/user.service';
import {IUser} from '../../interfaces/user.interface';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit, OnDestroy {
  public members: Array<IUser>;
  public member: IUser;
  public results: Array<IUser>;
  @Input() multiple = true;
  @Output() modelChanged = new EventEmitter();

  private unsubscribeAll = new Subject();

  constructor(private userService: UserService, private auth: AuthService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  resetInput() {
    this.members = [];
    this.member = null;
  }

  search(event) {
    this.userService.search(event.query)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(data => {
        this.results = data.filter(user => user._id !== this.auth.currentUser._id);
      });
  }
}
