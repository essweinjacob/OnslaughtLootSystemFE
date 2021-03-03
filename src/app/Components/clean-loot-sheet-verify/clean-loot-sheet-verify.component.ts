import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-clean-loot-sheet-verify',
  templateUrl: './clean-loot-sheet-verify.component.html',
  styleUrls: ['./clean-loot-sheet-verify.component.css']
})
export class CleanLootSheetVerifyComponent implements OnInit {

  constructor(private http: HttpClient,
              public dialogRef: MatDialogRef<CleanLootSheetVerifyComponent>) { }

  ngOnInit(): void {
  }

  cleanLootSheet(){
    this.http.get('http://localhost:8080/api/cleanLootSheet').subscribe(data => {
    });
    this.dialogRef.close();
  }

  closeDialog(){
    this.dialogRef.close()
  }
}
