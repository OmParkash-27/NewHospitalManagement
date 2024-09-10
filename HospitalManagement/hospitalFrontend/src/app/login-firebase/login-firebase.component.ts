import { Component } from '@angular/core';
import { HttpService } from '../common/http.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseAuthService } from '../common/firebase-auth.service';

@Component({
  selector: 'app-login-firebase',
  templateUrl: './login-firebase.component.html',
  styleUrls: ['./login-firebase.component.css']
})
export class LoginFirebaseComponent {

  
  loginFormObj: any = {};
  userTypes: any = [{"name":"admin"}, {"name": "doctor"}, {"name": "receptionist"}];

constructor(private httpService: HttpService, private router: Router, private snackBar: MatSnackBar, private firebaseAuth: FirebaseAuthService) { }

ngOnInit() { }

onSubmit() {
  console.log(this.loginFormObj);
  // this.firebaseAuth.signInWithPopupUser();
  // this.checkInDb(this.loginFormObj);
}

loginWithGoogle() {
  this.firebaseAuth.signInWithPopupUser();
}


}
