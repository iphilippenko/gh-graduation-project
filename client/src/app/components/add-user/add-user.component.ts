import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {UserService} from '../../services/user.service';
import {IUser} from '../../interfaces/user.interface';

@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit, OnDestroy {
  public members: Array<IUser>;
  public results: Array<IUser>;
  @Output() modelChanged = new EventEmitter();

  private unsubscribeAll = new Subject();

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  search(event) {
    this.userService.search(event.query)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(data => {
        this.results = data;
      });
  }


}
