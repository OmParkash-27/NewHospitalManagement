import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path:'', redirectTo:'public', pathMatch: 'full' },
  { path: 'public', component: IndexComponent },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'app', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
