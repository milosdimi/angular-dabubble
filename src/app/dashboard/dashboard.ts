import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { collection, getFirestore, limit, onSnapshot, orderBy, query, Unsubscribe } from 'firebase/firestore';
import { DialogAddUser } from '../dialog-add-user/dialog-add-user';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit, OnDestroy {
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private firestore = getFirestore();
  private unsubscribeCount?: Unsubscribe;
  private unsubscribeRecent?: Unsubscribe;

  userCount = signal(0);
  recentUsers = signal<any[]>([]);

  ngOnInit(): void {
    this.unsubscribeCount = onSnapshot(collection(this.firestore, 'users'), (snapshot) => {
      this.userCount.set(snapshot.size);
    });

    const recentQuery = query(collection(this.firestore, 'users'), orderBy('createdAt', 'desc'), limit(5));
    this.unsubscribeRecent = onSnapshot(recentQuery, (snapshot) => {
      this.recentUsers.set(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeCount?.();
    this.unsubscribeRecent?.();
  }

  initials(user: any): string {
    return `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase();
  }

  openUser(id: string): void {
    this.router.navigate(['/user', id]);
  }

  goToUsers(): void {
    this.router.navigate(['/user']);
  }

  openAddUser(): void {
    this.dialog.open(DialogAddUser);
  }
}
