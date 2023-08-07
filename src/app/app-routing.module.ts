import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { CartsComponent } from './components/carts/carts.component';

const routes: Routes = [
  {
    path:'',redirectTo:'produtcs',pathMatch:'full'
  },
  {
      path:'produtcs',component:ProductsComponent
  },
  {
      path:'carts',component:CartsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
