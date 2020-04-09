import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {IUser} from '../../../interfaces/user.interface';
import {AuthService} from '../../../services/auth.service';
import {ChatService} from '../../../services/chat.service';
import {AddUserComponent} from '../../add-user/add-user.component';

@Component({
  selector: 'members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss']
})
export class MembersListComponent implements OnInit, OnDestroy {
  @Input() members: Array<IUser> = [];
  @Input() isOwner: boolean;
  userToAdd: IUser | null = null;
  private unsubscribeAll = new Subject();

  @ViewChild('addUserComponent', {static: false}) addUserComponent: AddUserComponent;

  constructor(public auth: AuthService, private chatService: ChatService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  userAdded(user) {
    this.userToAdd = user;
  }

  deleteMember(id) {
    this.chatService.removeMember(id)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe();
  }

  addMember() {
    this.chatService.addMember(this.userToAdd._id)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.addUserComponent.resetInput();
        this.userToAdd = null;
      });
  }

}
