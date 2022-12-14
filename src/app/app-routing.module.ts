import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { CartComponent } from './components/pages/cart/cart.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { FavoritesComponent } from './components/pages/favorites/favorites.component';
import { FoodDetailsComponent } from './components/pages/food-details/food-details.component';
import { FrontpageComponent } from './components/pages/frontpage/frontpage.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { OrderListComponent } from './components/pages/order-list/order-list.component';
import { OrderTrackComponent } from './components/pages/order-track/order-track.component';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';

const routes: Routes = [
  { path: '', component: FrontpageComponent },
  { path: 'foods', component: HomeComponent },
  { path: 'foods/page/:num', component: HomeComponent },
  { path: 'search/:query', component: HomeComponent },
  { path: 'search/:query/page/:num', component: HomeComponent },
  { path: 'tag/:tag', component: HomeComponent },
  { path: 'tag/:tag/page/:num', component: HomeComponent },
  { path: 'food/:foodId', component: FoodDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'favorites', component: FavoritesComponent },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'track/:orderId',
    component: OrderTrackComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my-orders',
    component: OrderListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'payment',
    component: PaymentPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
