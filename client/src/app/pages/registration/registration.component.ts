import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {mergeMap, takeUntil} from 'rxjs/operators';
import {MessageService} from 'primeng/api';
import {AuthService} from '../../services/auth.service';
import {FileUploadService} from '../../services/file-upload.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [MessageService]
})
export class RegistrationComponent implements OnInit, OnDestroy {
  public registerForm: FormGroup;

  private unsubscribeAll = new Subject();

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private file: FileUploadService,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  private initForm() {
    this.registerForm = this.fb.group({
      avatar: [null, Validators.required],
      userName: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.minLength(8)]]
    });
  }

  public register() {
    this.file.fileUpload(this.registerForm.get('avatar').value)
      .pipe(
        takeUntil(this.unsubscribeAll),
        mergeMap(avatar => this.auth.register({...this.registerForm.value, avatar}))
      )
      .subscribe(() => {
        const successMsgLife = 1500;
        this.messageService.add({
          key: 'registration',
          severity: 'success',
          summary: 'Registration successful!',
          detail: 'Login to use the app!',
          life: successMsgLife,
          closable: false
        });
        setTimeout(() => this.router.navigate(['/login']), successMsgLife);
      });
  }

  public onImageUpload(image) {
    this.registerForm.patchValue({avatar: image});
    this.registerForm.updateValueAndValidity();
  }

}
