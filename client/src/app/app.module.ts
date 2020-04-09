import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
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
import {AuthService} from './services/auth.service';
import {ChatService} from './services/chat.service';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {environment} from '../environments/environment';

const config: SocketIoConfig = { url: environment.socketUrl, options: { autoConnect : false } };

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
    AppRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    MessageService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
      deps: [MessageService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      deps: [AuthService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
