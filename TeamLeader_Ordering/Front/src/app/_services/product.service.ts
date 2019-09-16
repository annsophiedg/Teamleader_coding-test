import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Logger } from './logger';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseURL = 'http://localhost:3000';
  productsURL;

  all_products;
  
  constructor(private http:HttpClient) {
    this.productsURL = this.baseURL + '/products';
  }

  public getProductsObservable() {
    return this.http.get(this.productsURL);
  }

  public setProducts(products) {
    this.all_products = products;
  }

  public getProducts() {
    return this.all_products;
  }

  public getDescription(prod_id) {
    // console.log(this.all_products);
    let total_products = this.all_products.length;
    //search for product with prod_id in product
    for (let p=0; p<total_products; p++ ) {
      if (this.all_products[p]['id'] == prod_id) {
        return this.all_products[p]['description'];
      }
    }
  }
}
