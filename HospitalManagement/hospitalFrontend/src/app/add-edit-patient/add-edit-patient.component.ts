import { Component, ViewChild } from '@angular/core';
import { HttpService } from '../common/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-edit-patient',
  templateUrl: './add-edit-patient.component.html',
  styleUrls: ['./add-edit-patient.component.css']
})
export class AddEditPatientComponent {

  title: string = 'Add';
  patientId: string = '';
  status: string = '';
  paramsObj: any;
  formObj: any = {};
  dARdata: any = [];
  doctors: any = [];
  doc_id: any = [];
  patientData: any = [];

  constructor(private activatedRoute: ActivatedRoute, private httpService: HttpService, private datePipe: DatePipe, 
    private route: Router, private snackBar: MatSnackBar) {
    this.activatedRoute.paramMap.subscribe((data)=> {
      //console.log(data, "-------params--------");

       this.paramsObj = data;
    });

    //console.log(this.paramsObj, "-------params Object--------");

    this.patientId = this.paramsObj.get('id');
    this.status = this.paramsObj.get('status');

    // console.log(this.status,"---status-----------patientId",this.patientId);
    

    if(this.patientId != undefined && this.status == null) {
      this.title = "Update";
      this.fetchPatientData(this.patientId);
     }

     if(this.patientId != undefined && this.status != null) {
      this.title = "New Entry of ";
      this.fetchPatientData(this.patientId);
     }

  }

  ngOnInit() {
    // console.log(this.adrComponent?.fetchADR());
    this.fetchADR();
  }

  onSubmit() {
    console.log(this.formObj,"-------formData------"); 
    const cDate = this.datePipe.transform(this.formObj.dates, 'yyyy-MM-dd');
    const appDate = this.datePipe.transform(this.formObj.appointment, 'yyyy-MM-dd');
    this.formObj.dates = cDate;
    this.formObj.appointment =  appDate;
    //console.log(this.formObj);
    if(this.patientId == undefined) {
      console.log("save in db method called");
      this.saveInDb(this.formObj);
    } else if(this.patientId != null && this.status != null) {
      console.log("saveNewEntry method called");
      this.saveNewEntry(this.formObj, this.patientId, this.status);
    } else {
      console.log("updateInDb method called");
      this.updateInDb(this.formObj, this.patientId);
    }
  }

  saveInDb(form: any) {
    console.log("------.>>>>>>>>>>>>>>",form);
    this.httpService.postRequest(form, "patientApi").subscribe((response)=> {
      console.log(response);
      this.snackBar.open('Success', 'close', {
        horizontalPosition: 'right', verticalPosition: 'top', duration: 5000
      })
      this.route.navigate(['patient-list']);
    });
  }

  updateInDb(form: any, id: string) {
    console.log("updating patient", form, "-------id-------", id);
    this.httpService.putRequest(form, "patientApi", id).subscribe((response)=> {
      console.log("response after update----- ",response);
      this.snackBar.open('Success', 'close', {
        horizontalPosition: 'right', verticalPosition: 'top', duration: 5000
      })
      this.route.navigate(['patient-list']);
      
    })
  }

  saveNewEntry(form: any, id: string, status: string) {
    this.httpService.putRequest(form, "patientApi", id + "/" + status).subscribe((response)=> {
      console.log("new entry response", response);
      this.snackBar.open('Success', 'close', {
        horizontalPosition: 'right', verticalPosition: 'top', duration: 5000
      })
      this.route.navigate(['patient-list']);
      
    })
  }

  fetchADR() {
    this.httpService.getRequest("dARApi/doctors").subscribe((response)=> {
      //console.log("ADR data ------", response);
      this.dARdata = response;
      //console.log(this.dARdata[0].name);
      for(let i in this.dARdata) {
        this.doctors[i] = this.dARdata[i];
        // this.doc_id[i]= this.dARdata[i]._id;
      }
      // console.log(this.doctors);
      // console.log(this.doc_id);
    })
  }

  BackToList() {
    this.route.navigate(['patient-list']);
  }

  fetchPatientData(id: string) {
    this.httpService.getRequestById("patientApi", id).subscribe((response) => {
      console.log("-----fetch patient data----------", response);
      this.patientData = response;
      console.log(this.patientData[0].madicines.length,"--medicine length----",this.patientData[0].madicines);

      this.formObj = this.patientData[0];
      const madicinesLength = this.patientData[0].madicines.length;
      const dDetailsLength = this.patientData[0].deseaseDetails.length;
      this.formObj.madicines = this.patientData[0].madicines[madicinesLength-1];
      this.formObj.deseaseDetails = this.patientData[0].deseaseDetails[dDetailsLength-1];

      let cDate = this.convertDate(this.patientData[0].dates);
      this.formObj.dates = cDate;

      if(this.patientData[0].appointment[0]) {
        let appDate = this.convertDate(this.patientData[0].appointment);
        this.formObj.appointment = appDate;
        //console.log(cDate,"--------",appDate);
      }
    })
  }

  convertDate(arrayDates: any): any {
          let totalDates = arrayDates.length;
          let lastDate = arrayDates[totalDates-1];
          let convertDate = new Date(lastDate);
        return convertDate;
      // console.log("inConverDate function----->>>>>>", patient, "--------", field);
  }
  
}
