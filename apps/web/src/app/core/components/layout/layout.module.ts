import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '@web/app/core/components';
import { LayoutComponent } from './layout.component';

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, RouterModule, HeaderModule],
})
export class LayoutModule {}
