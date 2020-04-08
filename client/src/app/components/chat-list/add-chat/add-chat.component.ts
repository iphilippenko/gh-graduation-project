import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CHAT_TYPES} from '../../../enums/chat-type.enum';
import {AuthService} from '../../../services/auth.service';
import {IUser} from '../../../interfaces/user.interface';

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

@Component({
  selector: 'add-chat',
  templateUrl: './add-chat.component.html',
  styleUrls: ['./add-chat.component.scss']
})
export class AddChatComponent implements OnInit {
  chatForm: FormGroup;
  types = Object.values(CHAT_TYPES).map(type => ({value: type, label: capitalize(type)}));

  @Output() chatCreated = new EventEmitter();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.chatForm = this.fb.group({
      type: [CHAT_TYPES.private, Validators.required],
      name: [null, Validators.required],
      members: [null, Validators.required]
    });
  }

  public setMembers(members: Array<IUser>) {
    this.chatForm.get('members').patchValue(members.map(member => member._id));
    this.chatForm.updateValueAndValidity();
  }

  public createChat() {
    this.chatCreated.emit(this.chatForm.value);
  }

}
