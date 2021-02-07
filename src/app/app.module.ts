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

@NgModule({
  declarations: [
    AppComponent,
    ItemEntryComponent,
    SearchByItemNamePipe,
    AttendanceComponent,
    SearchByCharNamePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
