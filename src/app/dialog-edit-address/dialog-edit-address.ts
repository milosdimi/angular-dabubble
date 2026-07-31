import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-dialog-edit-address',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    FormsModule,
  ],
  templateUrl: './dialog-edit-address.html',
  styleUrl: './dialog-edit-address.scss',
})
export class DialogEditAddress {
  private dialogRef = inject(MatDialogRef<DialogEditAddress>);
  private data = inject(MAT_DIALOG_DATA);
  private firestore = getFirestore();

  user = new User(this.data);
  loading = false;

  onCancel(): void {
    this.dialogRef.close();
  }

  async saveUser(): Promise<void> {
    this.loading = true;
    try {
      await updateDoc(doc(this.firestore, 'users', this.data.id), this.user.toJSON());
      this.dialogRef.close(this.user);
    } finally {
      this.loading = false;
    }
  }
}
