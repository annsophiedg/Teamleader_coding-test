import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Logger } from '../_services/logger';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseURL = 'http://localhost:3000';
  ordersURL;
  // orderURL;
  ord_id:number;

  //initial order only will be updated when user confirms his changes
  initOrder;
  all_orders;

  constructor(private http:HttpClient) {
    // Logger.devOnly("OrderService","Constructor",'constructed');
    this.ordersURL = this.baseURL + "/orders";
    // this.ordersURL = this.baseURL + "/order/" + this.ord_id;
  }

  public getOrdersObservable():Observable<any> {
    return this.http.get(this.ordersURL);
  }

  public setAllOrders(orders) {
    this.all_orders = orders;
  }

  public initSingleOrder(id) {
    //set ord_id to incoming id
    this.ord_id = id;

    let total_orders = this.all_orders.length;
    //search for order with ord_id in all_orders and return
    for (let o=0; o<total_orders; o++ ) {
      if (this.all_orders[o]['id'] == id) {
        //initialize the order and make a order_copy
        this.initOrder = this.all_orders[o];
        Logger.devOnly("OrderService","initSingleOrder",this.initOrder);
        return this.initOrder;
      }
    }
  }

  public getInitOrder() {
    return this.initOrder;
  }

  public changeOrderItem(order,item) {
    let prod_id = item['product-id'];

    //if quantity equals 0 delete item
    if (item['quantity'] == 0) {
      this.removeOrderItem(order,prod_id);
    } else {
      let already_in_order = false;
      let total_items = order['items'].length;
      let total = 0;
      //search for item with prod_id in order and change item values
      for (let i=0; i<total_items; i++) {
        if (order['items'][i]['product-id'] == prod_id) {
          already_in_order = true;
          // Logger.devOnly("OrderService","getSingleOrder",this.order['items'][i]);
          order['items'][i] = item;
        }
        total += parseFloat(order['items'][i]['total']);
        total.toFixed(2);
      }
      order['total'] = total.toString();

      //if item not yet changed in order by previous code, add order item
      if (already_in_order != true) {
        this.addOrderItem(order,item);
      }
    }
    
    // console.log("OrderService.","changeOrderItem: ",order);

    return order;
  }

  public addOrderItem(order,product) {
    order['items'].push(product);
  }
  
  public removeOrderItem(order,prod_id) {
    let index = this.getItemIndex(order,prod_id);
    // total price of order minus total of the item that has to be removed
    order['total'] -= order['items'][index]['total'];
    // delete 1 element with index
    order['items'].splice(index,1);
    Logger.devOnly("OrderService","removeOrderItem",order['items']);
  }

  public getItemIndex(order,prod_id) {
    let total_items = order['items'].length;
    for (let i=0; i<total_items; i++) {
      if (order['items'][i]['product-id'] == prod_id) {
        return i;
      } 
    }
    return -1;
  }

  public getQuantityOfOrderItem(order,prod_id) {
    let total_items = order['items'].length;
    for (let i=0; i<total_items; i++) {
      if (order['items'][i]['product-id'] == prod_id) {
        //return a number
        return parseInt(order['items'][i]['quantity']);
      } 
    }
    //if product not yet in order: quantity = 0
    return 0;
  }

  public saveOrderObservable(order):Observable<any> {
    //update initOrder with new order
    this.initOrder = order;
    console.log("test", this.initOrder);

    //send order to DB
    return this.http.put(this.ordersURL + "/" + this.ord_id, this.initOrder, httpOptions).pipe(
      // retry(3), // retry a failed request up to 3 times
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      // console.log(error.error);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
