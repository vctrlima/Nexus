import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '../../components';
import { MainLayoutComponent } from './main.component';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [CommonModule, RouterModule, HeaderModule],
})
export class MainModule {}
