import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AdminListComponent } from './components/Admin/admin-list/admin-list.component';
import { AnalyticalComponent } from './components/analytical/analytical.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch:'full'},
  { path: 'dashboard', component: DashboardComponent, children: [
    { path: '', redirectTo: 'analytical', pathMatch: 'full' },
    { path: '', component: AnalyticalComponent, pathMatch: 'full'},
    { path: 'admin', component: AdminListComponent, pathMatch: 'full' }
  ] },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
