import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {IUser} from '../../interfaces/user.interface';

@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  texts: string[];

  results: Array<IUser>;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  search(event) {
    this.userService.search(event.query).subscribe(data => {
      this.results = [
        {
          _id: 'id',
          userName: 'userName',
          avatar: 'userName',
        },
        {
          _id: 'id1',
          userName: 'userName1',
          avatar: 'userName',
        },
        {
          _id: 'id2',
          userName: 'userName2',
          avatar: 'userName',
        }
      ];
    });
  }


}
