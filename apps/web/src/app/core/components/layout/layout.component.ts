import { Component } from '@angular/core';

@Component({
  selector: 'nexus-layout',
  styleUrls: ['./layout.component.scss'],
  template: `
    <nexus-header></nexus-header>
    <main class="nexus-layout">
      <router-outlet></router-outlet>
    </main>
  `,
})
export class LayoutComponent {}
