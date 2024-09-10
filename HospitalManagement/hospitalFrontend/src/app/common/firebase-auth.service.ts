import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  // email = 'ompysaini1999@gmail.com';
  password = 'hospital';  
  user: any;

  constructor(private afAuth: AngularFireAuth) {}

  ngOnInit() {
    // this.createUser(this.email, this.password);
    // this.signInUser(this.email, this.password);
  }

  createUser(email:string, password:any) {
    this.afAuth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      // console.log("fB", user);
    }) .catch((error) => {
      console.log(error);
    })
  }

  signInUser(email:string, password:string) {
      return this.afAuth.signInWithEmailAndPassword(email, password).then((result) => {
          // console.log(result);
          this.user = result.user;
          this.getCurrentUserOnAuthStateChange();
          // this.sendResetPasswordEmailUser();
        }).catch((error) => {
          window.alert(error.message);
        })
  }

  signInWithPopupUser() {
    const provider = new GoogleAuthProvider();
    this.afAuth.signInWithPopup(provider)
    .then((result)=> {
      console.log("signInWithPopup", result);
    }).catch((err)=> {
      console.log("signInWithPopup", err);      
    })
  }

  signOutUser() {
    return this.afAuth.signOut().then((result)=> {
      console.log("signout", result);
    }).catch((err)=> {
      console.log("signout error", err);
    })
  }

  sendResetPasswordEmailUser(email: any) {
    if(this.user) {
      this.afAuth.sendPasswordResetEmail(email).then(()=> {
        alert("email sent")
      }).catch(()=> {
        alert("err to send email")
      })
    }
  }

  getCurrentUserOnAuthStateChange() {
    // this.afAuth.onAuthStateChanged((user) =>{
    //   console.log("OnAuthStateChange", user);
    // })
    const user = this.afAuth.currentUser;
    user.then((user)=> {
      console.log("user", user?.uid, user?.displayName, user?.email, user?.emailVerified, user?.photoURL);
    });
  }

  getUsersProviderProfile() {
    if (this.user !== null) {
      this.user.providerData.forEach((profile:any) => {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
      });
    }
  }

  updatePasswordUser(newPassword: string) {
    if(this.user) {
      confirm("are u want to update password");
      this.user.updatePassword(newPassword).then(() => {
        alert("update password")
      }).catch(() => {
        alert("err update passw0rd")
    })
  }
  }

  updateUserInfo(updateUser: {}) {
    if(this.user) {
      this.user.updateProfile( updateUser ).then(() => {
        console.log("update user", this.user);
      }).catch(()=> {
        console.log("err");
      })
    }
  }
}
