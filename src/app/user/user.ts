import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { collection, getFirestore, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { DialogAddUser } from '../dialog-add-user/dialog-add-user';

@Component({
  selector: 'app-user',
  imports: [MatButtonModule, MatIconModule, MatCardModule, MatTableModule, MatProgressSpinnerModule],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User implements OnInit, OnDestroy {
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private firestore = getFirestore();
  private unsubscribe?: Unsubscribe;

  displayedColumns = ['name', 'email', 'phone', 'city'];
  users = signal<any[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.unsubscribe = onSnapshot(collection(this.firestore, 'users'), (snapshot) => {
      this.users.set(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      this.loading.set(false);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe?.();
  }

  openDialog(): void {
    this.dialog.open(DialogAddUser);
  }

  openUserDetail(user: any): void {
    this.router.navigate(['/user', user.id]);
  }
}
