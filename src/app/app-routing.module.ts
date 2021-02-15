import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ItemEntryComponent } from './item-entry/item-entry.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { AdminPageComponent } from './adminpage/adminpage.component';
import { LogInComponent } from './log-in/log-in.component';
import { LogOutComponent } from './log-out/log-out.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  { path: 'adminLootSheet',
    component: ItemEntryComponent, canActivate:[AuthGuardService] },
  { path: 'adminAttendance',
    component: AttendanceComponent, canActivate:[AuthGuardService] },
  { path: 'adminPage',
    component: AdminPageComponent, canActivate:[AuthGuardService] },
  { path: 'login',
    component: LogInComponent },
  { path: 'logout',
    component: LogOutComponent, canActivate:[AuthGuardService] },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
