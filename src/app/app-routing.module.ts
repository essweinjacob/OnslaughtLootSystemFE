import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ItemEntryComponent } from './item-entry/item-entry.component';

const routes: Routes = [
  { path: 'adminLootSheet',
    component: ItemEntryComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
