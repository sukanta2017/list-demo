import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Pipe, PipeTransform } from '@angular/core';

@Injectable()
export class AppService {
  subject: Subject<any>;
  globalVariable: any = [];
  response: any;
  jsonURL: string;
  constructor(private http: Http) {
    this.subject = new Subject<any>();
  }

  httpPost(id: string, body?: any, method?: string, header?: any) {
    let servicePath = this.getGlobalVariables('servicePath');
    let url = 'http://' + servicePath + '/' + method;
    //let url = 'http://192.168.3.107:6161/' + method;
   // let url = 'http://fr.rancelab.com:6171' + method;
    let headers: any;
    let options: any;
    if (header) {
      if (header.contentType) {
        headers = new Headers({ 'Content-Type': header.contentType });
        options = new RequestOptions({ headers: headers });
      }
    }
    this.http
      .post(url, body, options)
      .map(response => response.json())
      .subscribe(d => {
        this.subject.next({ id: id, data: d });
      }, err => {
        this
          .subject.next({ id: id, data: { error: err } });
      });

  }

  //-----------------------------------------------
  //--------- 
  getSelectedList(listvalue:string){
     this.emit("select:grid:list",listvalue)
  }
  //-----------------------------------------------------
  
  
  getValues(): Observable<any> {
    return this.http.get(this.jsonURL)
      .map(response => response.json());
  }

  filterOn(id: string): Observable<any> {
    return (this.subject.filter(d => (d.id === id)));
  };

  getGlobalVariables(key) {
    return (this.globalVariable[key]);
  }

  setGlobalVariables(key, value) {
    this.globalVariable[key] = value;
  }
  emit(id: string, options?: any) {
    this.subject.next({ id: id, data: options });
  }

  

}