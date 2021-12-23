import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../entities/customer';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  /**
   * Permite consultar todos los clientes
   * @returns 
   */
  public getAllCustomer(): Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(environment.apiUrl + '/customers')
      .pipe(
        map( ( resp => resp['$values'] ) )
      );
  }
}
