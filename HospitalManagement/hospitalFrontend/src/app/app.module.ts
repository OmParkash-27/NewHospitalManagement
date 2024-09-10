import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AddEditADRComponent } from './add-edit-adr/add-edit-adr.component';
import { AddEditPatientComponent } from './add-edit-patient/add-edit-patient.component';
import { MatInputModule} from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MatButtonModule} from '@angular/material/button';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatCardModule} from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IsEamilDirective } from './directives/is-eamil.directive';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { AdrListComponent } from './adr-list/adr-list.component';
import { DatePipe } from '@angular/common';
import { GoogleChartsModule } from 'angular-google-charts';
import { NgChartsModule } from 'ng2-charts';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { PatientHistoryComponent } from './patient-history/patient-history.component';
import { AngularFireModule } from '@angular/fire/compat';
import { initializeApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import { LoginFirebaseComponent } from './login-firebase/login-firebase.component';

const environment = {
  firebase : {
    apiKey: "AIzaSyAUsCYbxUYcQA5P0CsMf_9wTKteUygoAEM",
    authDomain: "hospital-1999.firebaseapp.com",
    projectId: "hospital-1999",
    storageBucket: "hospital-1999.appspot.com",
    messagingSenderId: "593577032864",
    appId: "1:593577032864:web:7cea7c5fc98e9105499dc5",
    measurementId: "G-KMFF6CBKZR"
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddEditADRComponent,
    AddEditPatientComponent,
    IsEamilDirective,
    DashboardComponent,
    PatientListComponent,
    AdrListComponent,
    DoctorDashboardComponent,
    PatientHistoryComponent,
    LoginFirebaseComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    GoogleChartsModule,
    NgChartsModule ,
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,
    MatToolbarModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatDialogModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideAuth(() => {
      const auth = getAuth();
      return auth;
    }),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],  
})
export class AppModule { }
