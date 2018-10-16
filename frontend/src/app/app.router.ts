import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { SellerComponent } from './seller/seller.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'seller', component: SellerComponent}
  ];

@NgModule({imports: [ RouterModule.forRoot(routes) ],
    exports: [
        RouterModule
     ]})
export class AppRouter {
    
}