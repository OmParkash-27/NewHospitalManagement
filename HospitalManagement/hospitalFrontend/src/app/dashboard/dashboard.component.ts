import { Component } from '@angular/core';
import { HttpService } from '../common/http.service';
import { Router } from '@angular/router';
import { LogoutService } from '../common/logout.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  patientData: any = [];

  constructor(private httpService: HttpService, private route: Router, private logoutService: LogoutService) {

  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.httpService.getRequest("patientApiChart").subscribe((response) => {
      // console.log("patient count acc Month",response);  // array of objects
      this.patientData = response;
      //console.log("patient count acc Month", this.patientData);
      this.barChartData = [{ 'data': this.patientData, 'label': 'Monthly Patients' }];
    });
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
  public barChartLegend = true;
  public barChartData: any;

  logout() {
    this.logoutService.logout();
  }
  
}
