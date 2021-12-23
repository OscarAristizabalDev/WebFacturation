import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/entities/customer';
import { CustomerService } from '../../services/customer.service';
import { AccountService } from '../../services/account.service';
import { Account } from 'src/app/entities/account';
import { Product } from '../../entities/product';
import { ProductService } from '../../services/product.service';
import { AccountDetail } from '../../entities/account-detail';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  customers: Customer[] = [];
  products: Product[] = [];
  accountDetails: AccountDetail[] = [];
  // Formulario de facturas
  accountForm: FormGroup;
  customerIdControl: AbstractControl;
  accountDateControl: AbstractControl;

  // Formulario de productos
  accountDetailForm: FormGroup;
  productIdControl: AbstractControl;
  quantityControl: AbstractControl;
  priceProduct: number;
  total: number;

  isAddProduct: boolean = false;

  constructor(
    private customerService: CustomerService,
    private accountService: AccountService,
    private productService: ProductService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildFormAccount();
    this.buildFormAccountDetail();
    this.getAllCustomer();
    this.getAllProduct(); 
  }

  /**
   * Permite consultar todos los clientes
   */
  getAllCustomer() {
    this.customerService.getAllCustomer().subscribe((data: Customer[]) => {
      this.customers = data;
    });
  }

  /**
   * Permite consultar todos los productos
   */
  getAllProduct() {
    this.productService.getAllProduct().subscribe((data: Product[]) => {
      this.products = data;
      console.log(this.products);
    });
  }

  /**
   * Permite construir el formulario de facturas
   */
  buildFormAccount() {
    this.accountForm = this.formBuilder.group({
      customerId: ['', Validators.required],
      accountDate: ['', Validators.required]
    });
    this.customerIdControl = this.accountForm.controls['customerId'];
    this.accountDateControl = this.accountForm.controls['accountDate'];
  }

  /**
   * Permite construir el formulario del detalle de la factura
   */
  buildFormAccountDetail() {
    this.accountDetailForm = this.formBuilder.group({
      productId: ['', Validators.required],
      quantity: ['', Validators.required],
      total: ['', Validators.required],
    });
    this.productIdControl = this.accountDetailForm.controls['productId'];
    this.quantityControl = this.accountDetailForm.controls['quantity'];
  }

  /**
   * Permite mostrar el formulario para agregar un producto
   */
  displayFormProduct() {
    this.isAddProduct = true;
  }

  /**
   * Permite buscar el precio del producto seleccionado
   * @param e 
   */
  onSelectProduct(e) {
    this.priceProduct = this.products.find(x => x.id == e.value).price;
    this.accountDetailForm.get("quantity").setValue(0);
  }

  /**
   * Permite calcular el subtotal del producto agregado
   * @param e 
   */
  calculateSubTotal(e) {
    this.total = this.priceProduct * this.accountDetailForm.get('quantity').value;
  }

  /**
   * Permite registrar una factura
   */
  addAccount($event, { value }: FormGroup) {

    let account = new Account();
    account.customerId = value['customerId'];
    account.accountDate = value['accountDate'];
    account.accountDetails = this.accountDetails;

    this.accountService.addAccount(account).subscribe(data => {
      this.accountDetails = [];

    });
  }

  /**
   * Permite agregar un producto a la factura
   * @param $event 
   * @param param1 
   */
  addProductAccount(event, { value }: FormGroup){
    
    
    let accountDetail = new AccountDetail();
    accountDetail.productId = value['productId'];
    accountDetail.quantity = value['quantity'];
    accountDetail.total = value['total'];
    accountDetail.productName = this.products.find(x => x.id == value['productId']).name;

    this.accountDetails.push(accountDetail);
  }

  /**
   * Permite cancelar de agregar un producto a la factura
   * @param event 
   */
  cancelProductAccount(event){
    this.isAddProduct = false;
    this.accountDetailForm.get("quantity").setValue(0);
  }

}
