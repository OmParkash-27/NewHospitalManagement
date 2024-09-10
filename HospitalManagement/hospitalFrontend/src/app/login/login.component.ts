import { Component } from '@angular/core';
import { HttpService } from '../common/http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  loginFormObj: any = {};
  userTypes: any = [{"name":"admin"}, {"name": "doctor"}, {"name": "receptionist"}];

constructor(private httpService: HttpService, private router: Router, private snackBar: MatSnackBar) { }

ngOnInit() { }

onSubmit() {
  console.log(this.loginFormObj);
  this.checkInDb(this.loginFormObj);
}

async checkInDb(form: any) {
    this.httpService.postRequest(form, 'dARApiLogin').subscribe((res: any) => {
      //console.log(res,"----frontend res from server");  
      if(res.authenticate == "success" && res.userData.userType == "admin") {
        sessionStorage.setItem("isLoggedIn", 'true');
        sessionStorage.setItem("userType", 'admin');
        this.router.navigate(['dashboard']);
       // console.log(res.userType);
      } else if (res.authenticate == "success" && res.userData.userType == "doctor") {
        sessionStorage.setItem("isLoggedIn", 'true');
        sessionStorage.setItem("userType", 'doctor');
        this.router.navigate(['doctor-dashboard', res.userData._id]);
      } else if (res.authenticate == "success" && res.userData.userType == "receptionist") {
        sessionStorage.setItem("isLoggedIn", 'true');
        sessionStorage.setItem("userType", 'receptionist');
        this.router.navigate(['patient-list']);
      } else {
        console.log(res.authenticate);
        this.snackBar.open('Invalid Credentials', 'close', {
          horizontalPosition: 'right', verticalPosition: 'top', duration: 5000
        })
      }
    });
}

}
