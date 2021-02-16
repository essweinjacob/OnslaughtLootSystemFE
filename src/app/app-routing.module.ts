import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ItemEntryComponent } from './item-entry/item-entry.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { AdminPageComponent } from './adminpage/adminpage.component';

const routes: Routes = [
  { path: 'adminLootSheet',
    component: ItemEntryComponent },
  { path: 'adminAttendance',
    component: AttendanceComponent },
  { path: 'adminPage',
    component: AdminPageComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
