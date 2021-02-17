import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ItemEntryComponent } from './Components/item-entry/item-entry.component';
import { SearchByItemNamePipe } from './Pipes/search.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AttendanceComponent } from './Components/attendance/attendance.component';
import { SearchByCharNamePipe } from './Pipes/search-by-char-name.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { AddDateDialogComponent } from './Components/add-date-dialog/add-date-dialog.component';
import { AdminPageComponent } from './Components/adminpage/adminpage.component';
import { NotesDialogComponent } from './Components/notes-dialog/notes-dialog.component';
import { LoginComponent } from './Components/login/login.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './Services/auth.service';
import { PermsGuard } from './perms.guard';
import { RaiderItemEntryComponent } from './Components/raider-item-entry/raider-item-entry.component';
import { RaiderAttendanceComponent } from './Components/raider-attendance/raider-attendance.component';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';
import { AddNewUserDialogComponent } from './Components/add-new-user-dialog/add-new-user-dialog.component';
import { RemoveUserDialogComponent } from './Components/remove-user-dialog/remove-user-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemEntryComponent,
    SearchByItemNamePipe,
    AttendanceComponent,
    SearchByCharNamePipe,
    AddDateDialogComponent,
    AdminPageComponent,
    NotesDialogComponent,
    LoginComponent,
    RaiderItemEntryComponent,
    RaiderAttendanceComponent,
    ChangePasswordComponent,
    AddNewUserDialogComponent,
    RemoveUserDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    MatMenuModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatButtonToggleModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard, AuthService, PermsGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
