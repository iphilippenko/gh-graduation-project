import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BaseUrlInterceptor} from './interceptors/base-url.interceptor';
import {HttpErrorInterceptor} from './interceptors/http-error.interceptor';
import {AuthInterceptor} from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    ToastModule,
    AppRoutingModule
  ],
  providers: [
    MessageService,
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true  },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true  },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
