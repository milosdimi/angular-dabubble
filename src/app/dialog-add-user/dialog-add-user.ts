import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatProgressBarModule,
    FormsModule,
  ],
  templateUrl: './dialog-add-user.html',
  styleUrl: './dialog-add-user.scss',
})
export class DialogAddUser {
  private dialogRef = inject(MatDialogRef<DialogAddUser>);

  user = new User();
  birthDate: Date = new Date();
  loading = false;

  onCancel(): void {
    this.dialogRef.close();
  }

  async saveUser(): Promise<void> {
    this.loading = true;
    try {
      this.user.birthDate = this.birthDate.getTime();
      const firestore = getFirestore();
      await addDoc(collection(firestore, 'users'), {
        ...this.user.toJSON(),
        createdAt: serverTimestamp(),
      });
      this.dialogRef.close(this.user);
    } finally {
      this.loading = false;
    }
  }
}
