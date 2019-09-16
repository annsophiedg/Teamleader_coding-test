import { Component, OnInit } from '@angular/core';
import { OrderService } from '../_services/order.service';
import { ProductService } from '../_services/product.service';

import { Logger } from '../_services/logger';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  ord_id:number = 3;
  //order that is received from DB
  initOrder;
  //initOrder adapted with user changes
  changedOrder;

  showAllProducts:boolean;
  all_products;

  sendMessage:string;

  constructor(private orderSrv:OrderService,private productSrv:ProductService) { 
  }

  ngOnInit() {
    this.showAllProducts = false;
    //get order from DB and save
    this.orderSrv.getOrdersObservable().subscribe(res => {
      this.orderSrv.setAllOrders(res);

      this.initOrder =  this.orderSrv.initSingleOrder(this.ord_id);

      //make copy of order from DB to adjust with user changes
      this.changedOrder = JSON.parse(JSON.stringify(this.initOrder));
    });

    this.productSrv.getProductsObservable().subscribe(res => {
      this.productSrv.setProducts(res);
      this.all_products = this.productSrv.getProducts();
      
      // Logger.devOnly('OrderDetailComponent','ngOnInit',this.all_products);
    });
  }

  public itemChange(item) {
    this.changedOrder = this.orderSrv.changeOrderItem(this.changedOrder,item);
  }

  public orderChange(order) {
    this.changedOrder = order;
  }

  public openProductOverview() {
    this.showAllProducts = true;
  }

  public sendOrder() {
    this.setOrder();
    //send updated initOrder to DB
    this.orderSrv.saveOrderObservable(this.initOrder).subscribe(
      res => {
        this.sendMessage = "YOUR ORDER WAS SENT SUCCESFULLY";
        setTimeout(()=>{
          this.sendMessage = "";
        },2000)
        
        console.log(this.sendMessage, res);
      }
    );
  }

  public undoUserChanges() {
    this.changedOrder = JSON.parse(JSON.stringify(this.initOrder));
  }

  public setOrder() {
    this.initOrder = this.changedOrder;
    Logger.devOnly("OrderDetailComponent","setOrder",this.initOrder);
  }

}
