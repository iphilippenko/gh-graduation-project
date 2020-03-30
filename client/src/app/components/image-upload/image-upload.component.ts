import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit, OnChanges {
  public selectedImg: File | null = null;

  @Input() public width = '120px';
  @Input() public height = '120px';
  @Input() public dummyImageUrl = `/assets/img/dummy-profile.png`;
  @Input() public imageUrl: string;
  @Output() public fileChanged: EventEmitter<File | null> = new EventEmitter<File | null>();
  public image = this.imageUrl || this.dummyImageUrl;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.image = this.imageUrl || this.dummyImageUrl;
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
      this.image = e.currentTarget['result'];
    };
    reader.readAsDataURL(this.selectedImg);
  }

}
