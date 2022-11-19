import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { RatingModule } from 'ng-starrating';
import { SearchboxComponent } from './components/partials/searchbox/searchbox.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, HomeComponent, SearchboxComponent],
  imports: [BrowserModule, AppRoutingModule, RatingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
