import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class FakestoreService {

  private productsUrl : string = 'https://fakestoreapi.com';

  constructor(private http: HttpClient) { }

  // Products data
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl+'/products');
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.productsUrl+`/products/${id}`);
  }
  
  createProduct(product: Product) : Observable<any> {  
    return this.http.post(this.productsUrl, product);
  }

  updateProduct(product: Product) : Observable<any> {
    return this.http.put<Product>(this.productsUrl+'/products/'+product.id.toString(), product);
  }

  // Categories data
  getCategories(): Observable<Category[]> {
    return this.http.get<string[]>(this.productsUrl+'/products/categories')
      .pipe(map( (categories: string[]) => categories.map(
        (category: string) => {const res: Category = { name: category }; return res;})))
  }

}
