import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-date-dialog',
  templateUrl: './add-date-dialog.component.html',
  styleUrls: ['./add-date-dialog.component.css']
})
export class AddDateDialogComponent implements OnInit {

  givenDate: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
