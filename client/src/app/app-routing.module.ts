import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IsNotLoggedInGuard} from './guards/is-not-logged-in.guard';
import {IsLoggedInGuard} from './guards/is-logged-in.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'chat',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginModule',
    canActivate: [IsNotLoggedInGuard]
  },
  {
    path: 'registration',
    loadChildren: './pages/registration/registration.module#RegistrationModule',
    canActivate: [IsNotLoggedInGuard]
  },
  {
    path: 'chat',
    loadChildren: './pages/chat/chat.module#ChatModule',
    canActivate: [IsLoggedInGuard]
  },
  {
    path: 'chat/:id',
    loadChildren: './pages/chat/chat.module#ChatModule',
    canActivate: [IsLoggedInGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
