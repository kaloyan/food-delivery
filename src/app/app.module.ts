import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SearchboxComponent } from './components/partials/searchbox/searchbox.component';
import { TagsComponent } from './components/partials/tags/tags.component';
import { FoodDetailsComponent } from './components/pages/food-details/food-details.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { ToastComponent } from './components/partials/toast/toast.component';
import { ToasterComponent } from './components/partials/toaster/toaster.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { SpinnerComponent } from './components/partials/spinner/spinner.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { OrderItemsListComponent } from './components/partials/order-items-list/order-items-list.component';
import { MapComponent } from './components/partials/map/map.component';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { PaypalButtonComponent } from './components/partials/paypal-button/paypal-button.component';
import { OrderTrackComponent } from './components/pages/order-track/order-track.component';
import { PaginationComponent } from './components/partials/pagination/pagination.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { FrontpageComponent } from './components/pages/frontpage/frontpage.component';
import { HeroComponent } from './components/partials/hero/hero.component';
import { PopularDishesComponent } from './components/partials/popular-dishes/popular-dishes.component';
import { FoodItemComponent } from './components/partials/food-item/food-item.component';

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
    SpinnerComponent,
    CheckoutPageComponent,
    OrderItemsListComponent,
    MapComponent,
    PaypalButtonComponent,
    OrderTrackComponent,
    PaginationComponent,
    FooterComponent,
    FrontpageComponent,
    HeroComponent,
    PopularDishesComponent,
    FoodItemComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
