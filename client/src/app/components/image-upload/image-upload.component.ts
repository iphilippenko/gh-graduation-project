import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  public selectedImg: File | null = null;

  @Input() public width = '120px';
  @Input() public height = '120px';
  @Input() public dummyImageUrl = `/assets/img/dummy-profile.png`;
  @Input() public imageUrl: string = this.dummyImageUrl;
  @Output() public fileChanged: EventEmitter<File | null> = new EventEmitter<File | null>();

  constructor() {
  }

  ngOnInit() {
  }

  public onFileChanged(event) {
    this.selectedImg = event.target.files[0];
    this.fileChanged.emit(this.selectedImg);
    this.readFile();
  }

  private readFile() {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent) => {
      // tslint:disable-next-line:no-string-literal
      this.imageUrl = e.currentTarget['result'];
    };
    reader.readAsDataURL(this.selectedImg);
  }

}
