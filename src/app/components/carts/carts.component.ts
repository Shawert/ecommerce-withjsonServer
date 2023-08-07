import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { CartService } from 'src/app/api/cart.service';


@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent implements OnInit{
  public produtcs!:any[];
  public grandtotal:number =0;
  public isDiscount: boolean = false;
  constructor(private cart:CartService,private cdRef: ChangeDetectorRef){
  }

  ngOnInit():void{
    this.cart.getProduct().subscribe(res=>{
      this.produtcs =res;
      this.grandtotal =this.cart.getToTotalPrice();
    })
  }

  ngDoCheck(): void {
    this.cdRef.detectChanges();
  }

  getDiscount(): void {
    if(this.isDiscount==false){
      this.isDiscount = true
      this.grandtotal = this.grandtotal * 0.8;
    }
  }

  emptycar(){
    this.cart.removeallcart();
  }

  deleteItem(item:any){
    this.cart.removecartitem(item);
  }
}
