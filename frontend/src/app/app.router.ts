import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { SellerComponent } from './seller/seller.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'seller', component: SellerComponent},
    { path: '', redirectTo:'/home', pathMatch: 'full'}
  ];

@NgModule({imports: [ RouterModule.forRoot(routes) ],
    exports: [
        RouterModule
     ]})
export class AppRouter {
    
}