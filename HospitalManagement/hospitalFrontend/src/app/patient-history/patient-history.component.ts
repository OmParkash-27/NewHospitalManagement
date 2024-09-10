import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from '../common/http.service';

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.css']
})
export class PatientHistoryComponent {

  patientData:any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: {patientId: string, isHistory: boolean}, private httpService: HttpService) {
    if(this.data.isHistory == true) {
      console.log("patient Id in history modal", this.data.patientId);
      this.fetchPatientData(this.data.patientId);
    }
  }

  fetchPatientData(patientId: string) {
    this.httpService.getRequestById("patientApi", patientId).subscribe((response)=> {
      //console.log("patient is ", response);
      this.patientData = response;
      //this.patientData = this.patientData[0];
      console.log("patientData", this.patientData);
      
    })
  }

}
