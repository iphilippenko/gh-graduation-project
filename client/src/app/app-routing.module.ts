import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'chat',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginModule'
  },
  {
    path: 'registration',
    loadChildren: './pages/registration/registration.module#RegistrationModule'
  },
  {
    path: 'chat',
    loadChildren: './pages/chat/chat.module#ChatModule'
  },
  {
    path: 'chat/:id',
    loadChildren: './pages/chat/chat.module#ChatModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
