import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ItemEntryComponent } from './item-entry/item-entry.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { AdminPageComponent } from './adminpage/adminpage.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { PermsGuard } from './perms.guard';
import { RaiderItemEntryComponent } from './raider-item-entry/raider-item-entry.component';
import { RaiderAttendanceComponent } from './raider-attendance/raider-attendance.component';

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

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
