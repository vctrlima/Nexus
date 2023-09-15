import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { UserModule } from './modules/user/user.module';
import { MainModule } from './shared/layouts/main/main.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MainModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    UserModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
