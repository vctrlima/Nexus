import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@web/app/core/services';
import { UserApiService } from '@web/modules/user/services';

@Component({
  selector: 'nexus-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loading = false;

  public login = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private readonly authService: AuthService,
    private readonly userApiService: UserApiService,
    private readonly router: Router
  ) {}

  public submitForm(): void {
    if (!this.login.valid) return;
    if (!this.login.value.email || !this.login.value.password) return;
    const params = {
      email: this.login.value.email,
      password: this.login.value.password,
    };
    this.loading = true;
    this.userApiService.login(params).subscribe((response) => {
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
