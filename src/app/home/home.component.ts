import { Component, OnInit } from '@angular/core';
import { BankServiceService } from '../servicebank/bank-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name: any = "";
  acno:any ='';
  balance:any='';

  constructor(private ds: BankServiceService) {}

  ngOnInit(): void {
    
    if (localStorage.getItem("currentUname")) {
      this.name = localStorage.getItem("currentUname");
      
    }
  
  }
  getBalance(){
    if (localStorage.getItem("currentUname")){
      this.acno = JSON.parse(localStorage.getItem("currentAcno")||"")
      this.ds.balanceApi(this.acno).subscribe({
        next: (result: any) => {
          this.balance=result.message
        },
        error: (result: any) => {
          alert(result.error.message)
        }
      })
      
    }
  }
  profile(){
    this.acno = JSON.parse(localStorage.getItem("currentAcno")||"")
  }
}
