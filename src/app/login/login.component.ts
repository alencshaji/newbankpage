import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BankServiceService } from '../servicebank/bank-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // model for signup form
  pswCheck: any = false
  signupForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    uname: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
    psw: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]+')]],
    cpsw: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]+')]]
  })
  loginForm = this.lg.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]+')]],

  });
  // loginForm = this.
  toggleForm() {
    const container = document.querySelector('.container');
    if (container) {
      container.classList.toggle('active');
    }
  }
  constructor(private route: Router, private lg: FormBuilder, private fb: FormBuilder, private db: BankServiceService, private ds: BankServiceService) {

  }
  signup() {
    var path = this.signupForm.value
    var acno = path.acno
    var uname = path.uname
    var psw = path.psw
    var cpsw = path.cpsw
    if (this.signupForm.valid) {
      if (psw === cpsw) {
        this.pswCheck = false
        //  api call
        this.ds.accountCreate(acno, psw, uname).subscribe({
          next: (result: any) => {
            alert(result.message)
            this.toggleForm()
          },
          error: (result: any) => {
            alert(result.error.message)
          }
        })

      } else {
        this.pswCheck = true
      }

    } else {
      alert("invalid")
    }

  }

  login() {
    var acno = this.loginForm.value.acno;
    var psw = this.loginForm.value.psw;
    if (this.loginForm.valid) {
      this.db.loginPage(acno, psw).subscribe({
        next: (result: any) => {
          localStorage.setItem("currentAcno", JSON.stringify(acno));
          localStorage.setItem("currentUname", result.currentUser);
          alert(result.message);
          this.route.navigateByUrl("home");
        },
        error: (result: any) => {
          alert(result.error.message);
        }
      });
    } else {
      alert("Invalid login form");
    }
  }
  
  

}
