import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CHAT_TYPES} from '../../../enums/chat-type.enum';
import {AuthService} from '../../../services/auth.service';

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

@Component({
  selector: 'add-chat',
  templateUrl: './add-chat.component.html',
  styleUrls: ['./add-chat.component.scss']
})
export class AddChatComponent implements OnInit {
  chatForm: FormGroup;
  types = Object.values(CHAT_TYPES).map(type => ({value: type, label: capitalize(type)}));

  constructor(private fb: FormBuilder,
              private auth: AuthService) {
  }

  ngOnInit() {
    console.log(CHAT_TYPES);
    console.log(this.types);
    this.initForm();
  }

  private initForm() {
    this.chatForm = this.fb.group({
      type: [CHAT_TYPES.private, Validators.required],
      name: [null, Validators.required],
      owners: [],
      members: [null, Validators.required]
    });
  }

}
