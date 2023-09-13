import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BankServiceService {

  baseUrl: any = "http://localhost:5001/"
  constructor(private http: HttpClient) { }
  // api create
  accountCreate(acno: any, psw: any, uname: any) {
    const bodyData = { acno, psw, uname };
    return this.http.post(`${this.baseUrl}bankuser/create_acc`, bodyData);
  }
  loginPage(acno:any,psw:any){
    const bodyData ={acno,psw};
    return this.http.post(`${this.baseUrl}bankuser/login`,bodyData)
  }
  balanceApi(acno:any){
    return this.http.get(`${this.baseUrl}bankuser/balance/${acno}`)
  }

}
