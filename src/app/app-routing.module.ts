import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ItemEntryComponent } from './Components/item-entry/item-entry.component';
import { AttendanceComponent } from './Components/attendance/attendance.component';
import { AdminPageComponent } from './Components/adminpage/adminpage.component';
import { LoginComponent } from './Components/login/login.component';
import { AuthGuard } from './auth.guard';
import { PermsGuard } from './perms.guard';
import { RaiderItemEntryComponent } from './Components/raider-item-entry/raider-item-entry.component';
import { RaiderAttendanceComponent } from './Components/raider-attendance/raider-attendance.component';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';

const routes: Routes = [
  { path: 'adminLootSheet',
    component: ItemEntryComponent,
    canActivate: [AuthGuard,PermsGuard] },
  { path: 'adminAttendance',
    component: AttendanceComponent,
    canActivate: [AuthGuard,PermsGuard] },
  { path: 'adminPage',
    component: AdminPageComponent,
    canActivate: [AuthGuard,PermsGuard]},
  { path: 'login',
    component: LoginComponent },
  { path: 'lootsheet',
    component: RaiderItemEntryComponent,
    canActivate: [AuthGuard] },
  { path: 'attendance',
    component: RaiderAttendanceComponent,
    canActivate: [AuthGuard] },
  { path: 'changePassword',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard]},

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
