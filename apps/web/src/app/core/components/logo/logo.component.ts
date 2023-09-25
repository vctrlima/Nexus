import { Component, Input } from '@angular/core';

@Component({
  selector: 'nexus-logo',
  template: `<h1 class="nexus-logo">
    N<ng-container *ngIf="extended">exus</ng-container>
  </h1>`,
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent {
  @Input() public extended = false;
}
