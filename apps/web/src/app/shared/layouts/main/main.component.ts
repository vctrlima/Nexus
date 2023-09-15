import { Component } from '@angular/core';

@Component({
  selector: 'nexus-layout',
  styleUrls: ['./main.component.scss'],
  template: `
    <nexus-header></nexus-header>
    <main class="content">
      <router-outlet></router-outlet>
    </main>
  `,
})
export class MainLayoutComponent {}
