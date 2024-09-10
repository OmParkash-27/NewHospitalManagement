import { Component } from '@angular/core';
import { HttpService } from '../common/http.service';
import { Router } from '@angular/router';
import { LogoutService } from '../common/logout.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent {
  backButton: boolean= false;
  data: any = [];
  searchFormObj: any = {};
  patientData: any = [];
  displayedItems: any = [];
  currentPage: any = 0;
  pageSize: any = 5;
  
  constructor(private httpService: HttpService, private route: Router, private logoutService: LogoutService) {
    
  }

  ngOnInit() {
    this.fetchData();
    this.searchFormObj = {};
    this.backButton  = false;
    // console.log(this.patientData, "-----------pData");
  }

  onSubmit() {
    //console.log("-----search Form-----", this.searchFormObj);
    this.backButton = true;
    const mobile = this.searchFormObj.mobile.toString();
    this.httpService.getRequest("patientApiMobile/" + mobile).subscribe((response)=> {
      // console.log("response for one employee--------", response);
      this.data = response;
      this.displayedItems = this.addAppLength(this.data);
      // console.log("check appointment -", this.data[0].appointment[this.data[0].appointment.length-1]);
    });

  }

  openAddModal() {
    this.route.navigate(['add-edit-patient']);
  }

  openEditModal(id: string) {
    this.route.navigate(['add-edit-patient', id]);
  }

  openAddNewEntryModal(id: string, status: string = "newEntry") {
    this.route.navigate(['add-edit-patient', id, status]);
  }

  fetchData() {
    this.httpService.getRequest("patientApi").subscribe((response) => {
      //console.log(response);  // array of objects
      this.data = response;
      //console.log(this.data[0].name);
      this.data = this.addAppLength(this.data);
      //console.log(this.data);
      this.updateDisplayedItems();
      
    });
  }

  onPageChange(event: any) {
    // console.log("event is--",event, "=====pageindex====",event.pageIndex);
    this.currentPage = event.pageIndex;
    this.updateDisplayedItems();
  }

  updateDisplayedItems() {
    //console.log("currPage Index----", this.currentPage);
    const startIndex = this.currentPage * this.pageSize;
    this.displayedItems = this.data.slice(startIndex, startIndex + this.pageSize);
    //console.log("next page--", this.displayedItems);
    
  }

  // appointement length for fetching last date from array
  addAppLength(dataList: any) {
    for(let i in dataList) {
      let appoint =  dataList[i].appointment;
      //console.log(appoint);
      if(appoint !== null) {
        dataList[i]['appLength'] = dataList[i].appointment.length;
        //console.log("check appDate in addAppLength function=====", dataList[i].appLength);
      }
    }
    return dataList;
  }
  

  logout() {
    this.logoutService.logout();
  }
}
