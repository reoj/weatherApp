import { MatSnackBar} from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackbarcontrolService {
  current = {};
  constructor(public snackBar: MatSnackBar) { 
    this.snackBar = snackBar;
  }

  openSnackBar(message: string, action: string) {
    let bar = this.snackBar.open(message, action, {
      duration: 2000,
    });
    bar.onAction().subscribe(() => {
      this.snackBar.dismiss();
    });
  }
}
