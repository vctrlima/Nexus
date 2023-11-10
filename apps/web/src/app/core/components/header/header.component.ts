import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@web/app/core/services';

@Component({
  selector: 'nexus-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
