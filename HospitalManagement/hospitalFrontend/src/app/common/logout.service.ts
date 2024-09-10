import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private route: Router) { }

  logout() {
    if(confirm("Do you want to logout?")) {
      sessionStorage.setItem('isLoggedIn','false');
      sessionStorage.setItem('userType', '');
      this.route.navigate(['login']);
    }
  }
}
