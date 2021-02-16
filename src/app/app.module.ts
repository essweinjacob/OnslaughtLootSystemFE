import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ItemEntryComponent } from './item-entry/item-entry.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SearchByItemNamePipe } from './search.pipe';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceComponent } from './attendance/attendance.component';
import { SearchByCharNamePipe } from './search-by-char-name.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddDateDialogComponent } from './add-date-dialog/add-date-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AdminPageComponent } from './adminpage/adminpage.component';
import { NotesDialogComponent } from './notes-dialog/notes-dialog.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { PermsGuard } from './perms.guard';
import { RaiderItemEntryComponent } from './raider-item-entry/raider-item-entry.component';

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
    RaiderItemEntryComponent
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
    MatButtonToggleModule
  ],
  providers: [AuthGuard, AuthService, PermsGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
