import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@web/modules/user/services';

@Component({
  selector: 'nexus-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public register = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordRepeat: new FormControl('', Validators.required),
  });

  constructor(private readonly authService: AuthService) {}

  public submitForm(): void {
    if (!this.register.valid) return;
    if (!this.register.value.email) return;
    if (!this.register.value.name) return;
    if (!this.register.value.password) return;
    if (!this.register.value.passwordRepeat) return;
    if (this.register.value.password !== this.register.value.passwordRepeat) {
      return;
    }
    const params = {
      email: this.register.value.email,
      password: this.register.value.password,
      name: this.register.value.name,
    };
    this.authService.register(params).subscribe((response) => {
      if (!response.id) return;
      this.authenticateUser();
    });
  }

  private authenticateUser(): void {
    if (!this.register.value.email) return;
    if (!this.register.value.password) return;
    this.authService
      .login({
        email: this.register.value.email,
        password: this.register.value.password,
      })
      .subscribe((response) => {
        // TODO: Handle login response
        console.log(response);
      });
  }
}
