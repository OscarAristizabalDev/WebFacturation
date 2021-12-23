import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DxButtonModule, DxDataGridModule, DxDateBoxModule, DxFormModule, DxNumberBoxModule, DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { DxiItemModule } from 'devextreme-angular/ui/nested';


@NgModule({
  declarations: [
    AppComponent,
    AccountsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DxSelectBoxModule,
    DxFormModule,
    DxButtonModule ,
    DxiItemModule,
    DxDateBoxModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    DxDataGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);

