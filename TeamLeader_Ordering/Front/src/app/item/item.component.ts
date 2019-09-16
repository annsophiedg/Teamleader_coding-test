import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { OrderService } from '../_services/order.service';
import { Logger } from '../_services/logger';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() item;
  @Output()
  itemChange = new EventEmitter();

  @Input() product;
  @Output()
  productChange = new EventEmitter();

  prod_id:string;
  description:string;
  price:number;
  quantity:number;
  total:number;

  constructor(private orderSrv:OrderService,private productSrv:ProductService) {  }

  ngOnInit() {
    // Logger.devOnly("ItemComponent","ngOnInit","CONSTRUCTED");
    if (this.item) {
      // Logger.devOnly("ItemComponent","ngOnInit",this.item);
      this.prod_id = this.item['product-id'];
      this.description = this.productSrv.getDescription(this.prod_id);
      this.price = this.item['unit-price'];
      this.quantity = parseInt(this.item['quantity']);
      this.total = this.item['total'];
    } else if (this.product) {
      // Logger.devOnly("ItemComponent","ngOnInit","PRODUCT INIT");
      this.prod_id = this.product['id'];
      this.description = this.product['description'];
      this.price = this.product['price'];
      this.quantity = parseInt(this.product['quantity']);
      this.total = this.product['total'];    
    }
    
  }

  public lowerQuantity() {
    if (this.quantity !== 0) {
      this.quantity -= 1;
      this.recalculateTotal();
    }
    //save in data
    this.changeItem();
  }

  public addQuantity() {
    this.quantity += 1;
    this.recalculateTotal();
    //save in data
    this.changeItem();
  }

  public changeQuantity(q) {
    this.quantity = q;
    this.recalculateTotal();
    //save in data
    this.changeItem();
  }

  public recalculateTotal() {
    this.total = parseFloat((this.quantity * this.price).toFixed(2));
  }

  public changeItem() {
    this.setItem();
    if (this.item) {
      this.itemChange.emit(this.item);
    } else if (this.product) {
      this.productChange.emit(this.product);
    }
    // Logger.devOnly("ItemComponent","changeItem",this.item)
  }

  public deleteItem() {
    this.quantity = 0;
    this.changeItem();
    // Logger.devOnly("ItemComponent","deleteItem",this.item)
    // let id = this.item['product-id'];
    // this.orderSrv.removeOrderItem(id);
  }

  public setItem() {
    if (this.item) {
      this.item = {
        'product-id': this.prod_id,
        'quantity': this.quantity.toFixed(0),
        'unit-price': this.price,
        'total': this.total.toString()
      }
    } else if (this.product) {
      this.product = {
        'product-id': this.prod_id,
        'quantity': this.quantity.toFixed(0),
        'unit-price': this.price,
        'total': this.total.toString()
      }
    }
  }

}
