import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ItemEntryComponent } from './item-entry/item-entry.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { AdminPageComponent } from './adminpage/adminpage.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { PermsGuard } from './perms.guard';

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
    component: LoginComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
