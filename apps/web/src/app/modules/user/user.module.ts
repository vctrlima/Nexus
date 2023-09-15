import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './views';
import { RegisterComponent } from './views/register/register.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    UserRoutingModule,
  ],
  providers: [AuthService],
})
export class UserModule {}
