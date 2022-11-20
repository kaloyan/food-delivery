import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { RatingModule } from 'ng-starrating';
import { SearchboxComponent } from './components/partials/searchbox/searchbox.component';
import { TagsComponent } from './components/partials/tags/tags.component';
import { FoodDetailsComponent } from './components/pages/food-details/food-details.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, HomeComponent, SearchboxComponent, TagsComponent, FoodDetailsComponent],
  imports: [BrowserModule, AppRoutingModule, RatingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
