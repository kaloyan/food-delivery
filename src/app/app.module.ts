import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { RatingModule } from 'ng-starrating';
import { SearchboxComponent } from './components/partials/searchbox/searchbox.component';
import { TagsComponent } from './components/partials/tags/tags.component';
import { FoodDetailsComponent } from './components/pages/food-details/food-details.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { ToastComponent } from './components/partials/toast/toast.component';
import { ToasterComponent } from './components/partials/toaster/toaster.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchboxComponent,
    TagsComponent,
    FoodDetailsComponent,
    CartComponent,
    NotFoundComponent,
    LoginPageComponent,
    ToastComponent,
    ToasterComponent,
    RegisterPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RatingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
