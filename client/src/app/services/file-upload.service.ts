import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) {
  }

  public fileUpload(file: File): Observable<string> {
    const uploadData = new FormData();
    uploadData.append('file', file);
    return this.http.post('file', uploadData)
      .pipe(
        map((res: { path: string }) => res.path)
      );
  }
}
