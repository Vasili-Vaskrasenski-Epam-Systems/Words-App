import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertService } from './../alert/alert.service';


@Component({
  selector: "common-count-setter-dialog",
  templateUrl: "./common-count-setter-dialog.component.html",
})

export class CommonCountSetterDialogComponent {
  public count : number;
  constructor(public dialogRef: MatDialogRef<CommonCountSetterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CountSetterModel, private alertService: AlertService) {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.data.count <= this.data.maximumCount) {
      this.dialogRef.close(this.data.count);
    } else {
      this.alertService.error("Randomizer received an array with less length than requested count");
    }
  }
}

export class CountSetterModel {
  public count: number;
  public maximumCount: number;

  constructor(count: number, maximumCount: number) {
    this.count = count;
    this.maximumCount = maximumCount;
  }
}



