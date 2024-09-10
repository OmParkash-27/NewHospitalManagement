import { Component } from '@angular/core';
import { HttpService } from '../common/http.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddEditADRComponent } from '../add-edit-adr/add-edit-adr.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-adr-list',
  templateUrl: './adr-list.component.html',
  styleUrls: ['./adr-list.component.css']
})
export class AdrListComponent {
  adrData: any = [];
  currentPage: any = 0;
  displayedItems: any = [];
  pageSize: any = 8;


  constructor(private httpService: HttpService, private route: Router, private dialog: MatDialog, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.fetchADR();
    // window.location.reload();
  }

  fetchADR() {
    this.httpService.getRequest("dARApi").subscribe((response)=> {
      console.log("response from server", response);
      this.adrData = response;
      this.updateDisplayedItems()
    })
  }

  openAddModal() {
    //this.route.navigate(['add-edit-adr']);
    const dialogRef = this.dialog.open(AddEditADRComponent,{
      data: {
        isEdditing: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
      console.log("Dialog Closed after saving data");
    });
  }


  openEditModal(id: string) {
    const dialogRef = this.dialog.open(AddEditADRComponent, {
      data: {
        user_id: id, isEdditing: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
      console.log("Dialog Closed after updating data");
    });
  }

  deleteUser(id: string) {
    if(confirm("Are you sure to delete user")) {
    this.httpService.deleteRequest("dARApi", id).subscribe((response)=> {
      console.log("after delete user server response:-", response);
      this.snackBar.open('Deleted', 'close', {
        horizontalPosition: 'right', verticalPosition: 'top', duration: 5000
      })
      this.fetchADR();
    })
  }
}

  onPageChange(event: any) {
    console.log("event is--",event, "=====pageindex====",event.pageIndex);
    this.currentPage = event.pageIndex;
    this.updateDisplayedItems();
  }

  updateDisplayedItems() {
    //console.log("currPage Index----", this.currentPage);
    const startIndex = this.currentPage * this.pageSize;
    this.displayedItems = this.adrData.slice(startIndex, startIndex + this.pageSize);
    //console.log("next page--", this.displayedItems);
    
  }
}
