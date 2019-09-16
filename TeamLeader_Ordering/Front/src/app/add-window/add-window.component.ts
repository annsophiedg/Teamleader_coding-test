import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../_services/product.service';

import { Logger } from '../_services/logger';
import { OrderService } from '../_services/order.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-add-window',
  templateUrl: './add-window.component.html',
  styleUrls: ['./add-window.component.css']
})
export class AddWindowComponent implements OnInit {

  @Input() products;

  @Input() changedOrder;
  newChangedOrder;
  @Output() orderChange = new EventEmitter();

  @Input() view_add_window:boolean;
  @Output() view_add_windowChange = new EventEmitter();


  constructor(private orderSrv:OrderService,private productSrv:ProductService) {
  }

  ngOnInit() {
    //set quantity & total of each product equal to current quantity of changedOrder
    this.products.forEach(p => {
      p['quantity'] = this.orderSrv.getQuantityOfOrderItem(this.changedOrder,p['id']);
      p['total'] = p['quantity']*p['price'];
    });
    //make a copy to save all user changes of this window
    this.newChangedOrder = JSON.parse(JSON.stringify(this.changedOrder));
  }
  
  public productChange(item) {
    this.newChangedOrder = this.orderSrv.changeOrderItem(this.newChangedOrder,item);
  }

  public addItems(){
    console.log(this.newChangedOrder);
    // this.changedOrder = this.newChangedOrder;
    this.orderChange.emit(this.newChangedOrder);
    this.closeWindow();
  }

  public cancel() {
    //set newChangedOrder back to changedOrder (copy)
    this.newChangedOrder = JSON.parse(JSON.stringify(this.changedOrder));
    this.closeWindow();
  }

  public closeWindow() {
    this.view_add_window = false;this.view_add_windowChange.emit(this.view_add_window);
  }

}
