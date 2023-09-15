import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService, LoginResponse } from '@web/modules/user/services';

@Component({
  selector: 'nexus-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public login = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private readonly authService: AuthService) {}

  public submitForm(): void {
    if (!this.login.valid) return;
    if (!this.login.value.email || !this.login.value.password) return;
    const params = {
      email: this.login.value.email,
      password: this.login.value.password,
    };
    this.authService.login(params).subscribe((response) => {
      // TODO: Handle login response
      console.log(response);
    });
  }
}
