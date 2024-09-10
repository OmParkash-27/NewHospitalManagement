import { Component } from '@angular/core';
import { HttpService } from '../common/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PatientHistoryComponent } from '../patient-history/patient-history.component';
import { LogoutService } from '../common/logout.service';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent {

  patientChartData: any = [];
  doctorId: any;

  data: any = [];
  displayedItems: any = [];
  currentPage: any = 0;
  pageSize: any = 5;

 
  
  constructor(private httpService: HttpService, private route: Router, private activatedRoute: ActivatedRoute, private dialog: MatDialog,
    private logoutService: LogoutService) {
      this.activatedRoute.params.subscribe((data)=> {
        // console.log("doc Id-----", data);
        this.doctorId = data['id'];
      })
  }

  ngOnInit() {
    if(this.doctorId != undefined) {
      this.patientsDoctor(this.doctorId);
      this.fetchPatientChartData(this.doctorId);
    }
    
  }

  fetchPatientChartData(d_id: string) {
    this.httpService.getRequestById("patientApiChartForDoctor", d_id).subscribe((response) => {
      // console.log("patient count acc Month",response);  // array of objects
      this.patientChartData = response;
      //console.log("patient count acc Month", this.patientChartData);
      this.barChartData = [{ 'data': this.patientChartData, 'label': 'Monthly Patients' }];
    });
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
  public barChartLegend = true;
  public barChartData: any;



patientsDoctor(docId: string) {
  this.httpService.getRequest("patientsDoctorApi/" + docId).subscribe((response) => {
    //console.log(response);  // array of objects
    this.data = response;
    //console.log(this.data[0].name);
    this.data = this.addAppLength(this.data);
    //console.log(this.data);
    this.data =  this.findCurrFutureAppoint(this.data);

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
  console.log("next page--", this.displayedItems);
  
}

findCurrFutureAppoint(data: any) {
  // console.log("data after add appLength key in obje", data);
  
  for(let i=0; i<data.length; i++) {
    //console.log("count loop", i);
    if(data[i].appointment !== null) {
    const appointLength = data[i].appLength;
    const datesLength = data[i].dates.length;
    //console.log("appointment length of ",i, appointLength);
  
    let lastAppoint =  data[i].appointment[appointLength-1];
    let lastDateInDates = data[i].dates[datesLength-1];
    //console.log("lastDateInDates is---",lastDateInDates);
    
    let currDate = new Date();
    currDate.setHours(0,0,0,0); // for current appoint. patients will also show

    if(lastAppoint !== null || lastAppoint != undefined) {
      let lastDate = new Date(lastAppoint);
      if(lastDate >= currDate) {
        data[i]['curFutAppointment'] = lastAppoint;
        console.log("curFut Last date is:----", data);
        this.displayedItems.push(data[i]);
      }
      //console.log("check appDate in addAppLength function=====", dataList[i].appLength);
    } 

  }
}
return this.displayedItems;
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


openHistoryModal(id: string) {
  // console.log("patient id history", id);
  const matDialogRef =  this.dialog.open(PatientHistoryComponent,  {
      height: '50%',
      width: '40%',
      data: {
        "patientId":id, "isHistory": true
    }
  });

}

logout() {
  this.logoutService.logout();
}

}
