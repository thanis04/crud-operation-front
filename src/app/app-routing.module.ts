import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthenticationContextComponent} from "./authentication/authentication-context/authentication-context.component";
import {LoginComponent} from "./authentication/login/login.component";
import {SignUpComponent} from "./authentication/sign-up/sign-up.component";
import {UserTableComponent} from "./model/user-table/user-table.component";
import {AuthenticationComponent} from "./authentication/authentication.component";
import {DeleteComponent} from "./model/delete/delete.component";
import {UpdateComponent} from "./model/update/update.component";

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthenticationContextComponent,
    children: [
      { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'sign-up', component: SignUpComponent },
    ],
  },
  {
    path: 'user',
    component: AuthenticationComponent,
    children: [
      {path: 'table', component: UserTableComponent},
      {path: 'delete', component: DeleteComponent},
      {path: 'update', component: UpdateComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
