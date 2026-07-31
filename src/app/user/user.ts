import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUser } from '../dialog-add-user/dialog-add-user';

@Component({
  selector: 'app-user',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User {
  private dialog = inject(MatDialog);

  openDialog(): void {
    this.dialog.open(DialogAddUser);
  }
}
