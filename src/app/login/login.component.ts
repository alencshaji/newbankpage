import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  toggleForm() {
    const container = document.querySelector('.container');
    if (container) {
      container.classList.toggle('active');
    }
  }
  constructor(private route:Router){

  }
  login(){
  this.route.navigateByUrl("home")
  }
}
