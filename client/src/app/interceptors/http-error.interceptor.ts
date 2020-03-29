import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {MessageService} from 'primeng/api';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((error) => {
        let errorMsg;
        if (error instanceof HttpErrorResponse) {
          if (error.error.message) {
            errorMsg = error.error.message;
          } else {
            errorMsg = `error status : ${error.status} ${error.statusText} ${error.url}`;
          }
        } else {
          errorMsg = 'something happened';
        }
        this.addErrorMessage(errorMsg);
        return throwError(error);
      })
    );
  }

  addErrorMessage(detail) {
    console.log(detail);
    this.messageService.add({key: 'app-message', severity: 'error', summary: 'Error: ', detail, life: 60000});
  }
}
