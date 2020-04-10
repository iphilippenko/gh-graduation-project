import {Component, OnDestroy, OnInit} from '@angular/core';
import {mergeMap, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {FileUploadService} from '../../services/file-upload.service';
import {Router} from '@angular/router';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit, OnDestroy {
  public menuShown = false;
  public newAvatar: File | null;

  private unsubscribeAll = new Subject();

  constructor(public authService: AuthService,
              private file: FileUploadService,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  public show() {
    this.menuShown = true;
  }

  public hide() {
    this.menuShown = false;
  }

  public toggle() {
    this.menuShown = !this.menuShown;
  }

  public onImgUpload($event) {
    this.newAvatar = $event;
    if (!this.menuShown) {
      this.show();
    }
  }

  public logout() {
    this.hide();
    this.messageService.disconnect();
    this.authService.logout();
    setTimeout(() => {
      this.router.navigate(['/login']);
    });
  }

  public saveAvatar() {
    this.file.fileUpload(this.newAvatar)
      .pipe(
        takeUntil(this.unsubscribeAll),
        mergeMap(avatar => this.authService.updateUserInfo({avatar}))
      )
      .subscribe(() => {
        this.newAvatar = null;
      });
  }

}
