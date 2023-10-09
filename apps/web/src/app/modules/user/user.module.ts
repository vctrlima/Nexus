import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LogoModule } from '@web/app/core/components/logo/logo.module';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './views';
import { RegisterComponent } from './views/register/register.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    LogoModule,
    UserRoutingModule,
  ],
  providers: [],
})
export class UserModule {}
