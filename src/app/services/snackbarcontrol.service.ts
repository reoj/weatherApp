import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { VisibleError } from '../models/error.type';

@Injectable({
  providedIn: 'root',
})
export class SnackbarcontrolService {
  private snackBarConfig = new MatSnackBarConfig();
  constructor(public snackBar: MatSnackBar) {
    this.snackBar = snackBar;
  }
  openNotificationSnackBar(message:string, action:string, duration?:number) {
    this.snackBarConfig.duration = duration;
    this.snackBar.open(message, action, this.snackBarConfig);
  }
  openSnackBar(error: VisibleError) {
    var configObject = this.snackBarConfig;
    if (error.givenDuration) {
      configObject.duration = error.givenDuration;
    }

    var barRef = this.snackBar.open(error.message, error.action, configObject);
    barRef.onAction().subscribe(this.dismiss);
  }

  private dismiss(): void {
    this.snackBar.dismiss();
  }
}
