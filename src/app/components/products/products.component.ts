import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/api/cart.service';
import { ProductsService } from 'src/app/api/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public productList:any;
  
  constructor(private api:ProductsService,private cart:CartService){
  }

  ngOnInit() : void{
    this.api.getProduct().subscribe(res=>{
      this.productList=res;
      this.productList.array.forEach((a:any) => {
        Object.assign(a,{quantity:1,total:a.price})
      });
    })
  }
  
  addToCart(product:any){
    product.quantity +=1;
    product.stock -=1;
    this.cart.addToCart(product);
  }


  prepareDescription(description: string): string {
    if (description.length <= 150) {
      return description;
    }
    const trimmedDescription = description.substring(0, 150);
    const lastSpaceIndex = trimmedDescription.lastIndexOf(' ');
    if (lastSpaceIndex !== -1 && lastSpaceIndex !== trimmedDescription.length - 1) {
      return trimmedDescription.substring(0, lastSpaceIndex) + '...';
    }
    return trimmedDescription.slice(0, -1) + '...';
  }
}
