import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {
api: string = "http://localhost:3000/"
public productList = new BehaviorSubject<any>([])
public cartitemlist: any=[]
public grandTotal: number =0;
  constructor(
    private _http: HttpClient
  ) { }

  getProduct(){
    return this.productList.asObservable();
  }

  //add to cart

  addToCart(product:any){
    const existingProduct = this.cartitemlist.find((item: any) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1; 
    this._http.put<any>(`http://localhost:3000/posts/${product.id}`, existingProduct)
      .subscribe(
        updatedProduct => {
          this.cartitemlist.updateProduct(updatedProduct);
          this.getToTotalPrice();
        },
        error => {
          console.log('Hata oluştu:', error);
        }
      );
  } else {
    product.quantity = 1; 
    this.cartitemlist.push(product); 
    this.productList.next(this.cartitemlist); 
    this.getToTotalPrice(); 
  }
  }
  
  getToTotalPrice():number{
    let grandTotal = 0;
    this.cartitemlist.forEach((item: any) => {
      grandTotal += item.price * item.quantity;
    });
    return grandTotal;
  }


  removeallcart(){
    this.cartitemlist=[]
    this.productList.next(this.cartitemlist)
  }

  removecartitem(product:any){
    this.cartitemlist.map((a:any,index:any)=>
    {if(product.id === a.id)
      this.cartitemlist.splice(index,1)
    })
    this.productList.next(this.cartitemlist)
  }

}
