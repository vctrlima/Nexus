import { Component } from '@angular/core';
import { AuthService, SearchService } from '@web/app/core/services';

@Component({
  selector: 'nexus-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public search!: string;

  public get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  constructor(
    private readonly authService: AuthService,
    private readonly searchService: SearchService
  ) {}

  public submitSearch() {
    this.searchService.searchQuery = this.search;
  }
}
