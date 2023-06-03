import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { HeaderComponent } from '@bm/common-ui';
import { APP_ENVIRONMENT,AuthInterceptor } from '@bm/core';
import {environment} from './environment/environment';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    HttpClientModule,
    HeaderComponent
  ],
  providers: [
    {provide:APP_ENVIRONMENT,useValue:environment},
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor,multi:true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
