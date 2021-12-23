import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../entities/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  /**
   * Permite consultar todos los productos
   * @returns 
   */
   public getAllProduct(): Observable<Array<Product>>{
    return this.http.get<Array<Product>>(environment.apiUrl + '/products')
      .pipe(
        map( ( resp => resp['$values'] ) )
      );
  }
}
