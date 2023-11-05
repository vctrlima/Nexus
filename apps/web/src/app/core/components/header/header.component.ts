import { Component } from '@angular/core';
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

  constructor(private readonly authService: AuthService) {}
}
