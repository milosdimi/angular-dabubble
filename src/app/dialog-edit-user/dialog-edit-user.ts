import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatProgressBarModule,
    FormsModule,
  ],
  templateUrl: './dialog-edit-user.html',
  styleUrl: './dialog-edit-user.scss',
})
export class DialogEditUser {
  private dialogRef = inject(MatDialogRef<DialogEditUser>);
  private data = inject(MAT_DIALOG_DATA);
  private firestore = getFirestore();

  user = new User(this.data);
  birthDate: Date = new Date(this.data.birthDate);
  loading = false;

  onCancel(): void {
    this.dialogRef.close();
  }

  async saveUser(): Promise<void> {
    this.loading = true;
    try {
      this.user.birthDate = this.birthDate.getTime();
      await updateDoc(doc(this.firestore, 'users', this.data.id), this.user.toJSON());
      this.dialogRef.close(this.user);
    } finally {
      this.loading = false;
    }
  }
}
