import { Component, Inject } from '@angular/core';
import { HttpService } from '../common/http.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-edit-adr',
  templateUrl: './add-edit-adr.component.html',
  styleUrls: ['./add-edit-adr.component.css']
})
export class AddEditADRComponent {

  formObj: any = {};
  responseArray: any = [];
  userId: any;
  title: string= 'Add';
  users: any = [{"name":"admin"}, {"name": "doctor"}, {"name": "receptionist"}];

  constructor(@Inject(MAT_DIALOG_DATA) public data: {user_id: string, isEdditing: boolean}, private httpService: HttpService,
  private snackBar: MatSnackBar, private route: Router, private dialog: MatDialog) {
    console.log("mat data", data);
    console.log("user id is : ", this.userId);
    
    if(this.data.isEdditing == true) {
      this.title = 'Update';
      this.userId = this.data.user_id;
      this.fetchRecord(this.data.user_id);
    }
  }

  onSubmit() {
    console.log("on submit data:- ", this.formObj);
    this.saveInDb(this.formObj);
    if(this.userId != null || this.userId != undefined) {
      this.updateInDb(this.formObj, this.userId);
    }
  }

  saveInDb(form: any) {
    this.httpService.postRequest(form, "dARApi").subscribe((response)=> {
      console.log("res after save data:-", response);
      this.snackBar.open('Success', 'close', {
        horizontalPosition: 'right', verticalPosition: 'top', duration: 5000
      })
      
    })
  }

  updateInDb(form: any, id: string) {
    this.httpService.putRequest(form, "dARApi", id).subscribe((response)=> {
      console.log("after update data:- ", response);
      this.snackBar.open('Updated', 'close', {
        horizontalPosition: 'right', verticalPosition: 'top', duration: 5000
      })
      
    })
  }

  BackToList() {
    this.formObj = {};
    this.dialog.closeAll();
    this.route.navigate(['dashboard']);
  }

  fetchRecord(id: string) {
    this.httpService.getRequestById("dARApi", id).subscribe((response)=> {
      console.log("fetch user data:---", response);
        this.responseArray = response;
        this.formObj = this.responseArray[0];
        //this.formObj.password = this.responseArray[0].password;
        this.formObj.password = '';
    })
  }
  

}
