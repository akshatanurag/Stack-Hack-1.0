import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoListItemComponent } from './components/todo-list-item/todo-list-item.component';
import { SearhBarComponent } from './components/searh-bar/searh-bar.component';
import { EditItemComponent } from './components/edit-item/edit-item.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerSmComponent } from './components/spinner-sm/spinner-sm.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';

import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AuthGuardService } from './guards/auth-guard.service';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { VerificationGuardGuard } from './guards/verification-guard.guard';

const appRoutes: Routes = [
  {path: '', canActivate: [AuthGuardService, /* VerificationGuardGuard */], component: HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'email-verification', component: EmailVerificationComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HeaderComponent,
    FooterComponent,
    TodoListComponent,
    TodoListItemComponent,
    SearhBarComponent,
    EditItemComponent,
    AddTaskComponent,
    SpinnerComponent,
    SpinnerSmComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent,
    FilterBarComponent,
    EmailVerificationComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
