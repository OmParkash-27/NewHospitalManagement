import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../common/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

userTypes: any = [{label: "Admin", "name":"admin" }, {label: "Doctor", "name": "doctor" }, { label: "Receptionist", "name": "receptionist" }];
loginForm = new FormGroup( { password: new FormControl("") , email: new FormControl("", [Validators.email]), userType: new FormControl("") } )

constructor(private httpService: HttpService, private router: Router) {}

ngOnInit() {}

onSubmit() {
  // console.log(this.loginForm.value);
  this.checkInDb(this.loginForm.value);
}

dropDownValueChange(event: any) {
  this.loginForm.value.userType = event.value.name;
  console.log(this.loginForm.value);
}

async checkInDb(form: any) {
    this.httpService.postRequest(form, 'dARApiLogin').subscribe((res: any) => {
      if(res.authenticate == "success" && res.userData.userType == "admin") {
        sessionStorage.setItem("isLoggedIn", 'true');
        sessionStorage.setItem("userType", 'admin');
        this.router.navigate(['app']);
      } else if (res.authenticate == "success" && res.userData.userType == "doctor") {
        sessionStorage.setItem("isLoggedIn", 'true');
        sessionStorage.setItem("userType", 'doctor');
        // this.router.navigate(['doctor-dashboard', res.userData._id]);
        this.router.navigate(['app']);
      } else if (res.authenticate == "success" && res.userData.userType == "receptionist") {
        sessionStorage.setItem("isLoggedIn", 'true');
        sessionStorage.setItem("userType", 'receptionist');
        this.router.navigate(['app']);
      } else {
        // console.log(res.authenticate);
        // this.snackBar.open('Invalid Credentials', 'close', {
        //   horizontalPosition: 'right', verticalPosition: 'top', duration: 5000
        //  })
      }
    });
}

}
