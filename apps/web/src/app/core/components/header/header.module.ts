import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LogoModule } from '@web/app/core/components/logo/logo.module';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, FormsModule, RouterModule, LogoModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
