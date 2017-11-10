import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { CustomListComponent } from './custom-list/custom-list.component';
import { 
  DxButtonModule, 
  DxTemplateModule, 
  DxTextAreaModule,
  DxDataGridModule,
  DxSelectBoxModule
 } from 'devextreme-angular';
 import { AppService } from "./providers/custom-list.service";

@NgModule({
  declarations: [
    AppComponent,
    CustomListComponent,
  ],
  imports: [
    BrowserModule,
    DxButtonModule, DxTemplateModule, DxTextAreaModule, HttpModule,
    DxDataGridModule,
    DxSelectBoxModule
   ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
