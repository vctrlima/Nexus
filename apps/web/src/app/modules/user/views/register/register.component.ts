import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@web/app/core/services';
import { UserApiService } from '@web/modules/user/services';

@Component({
  selector: 'nexus-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public loading = false;

  public register = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordRepeat: new FormControl('', Validators.required),
  });

  constructor(
    private readonly authService: AuthService,
    private readonly userApiService: UserApiService,
    private readonly router: Router
  ) {}

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
    this.loading = true;
    this.userApiService.register(params).subscribe((response) => {
      if (!response.id) {
        this.loading = false;
        return;
      }
      this.authenticateUser();
    });
  }

  private authenticateUser(): void {
    if (!this.register.value.email) return;
    if (!this.register.value.password) return;
    this.userApiService
      .login({
        email: this.register.value.email,
        password: this.register.value.password,
      })
      .subscribe((response) => {
        if (!response.user.id) {
          this.loading = false;
          return;
        }
        this.authService.setSession(response);
        if (!this.authService.isLoggedIn) return;
        this.router.navigate(['/']);
      });
  }
}
