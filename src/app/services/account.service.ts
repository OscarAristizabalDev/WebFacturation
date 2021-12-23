import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Account } from '../entities/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  /**
   * Permite registrar una nueva factura
   */
   public addAccount(account: Account){
    return this.http.post(environment.apiUrl + '/accounts', account);
  }
}
