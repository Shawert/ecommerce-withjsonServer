import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/api/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  public totalItem =0;
  constructor(private cart:CartService){}


  ngOnInit():void{
        this.cart.getProduct().subscribe(res=>{
        this.totalItem = res.lenght;
      })
    
  }
}
