import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { deleteDoc, doc, getDoc, getFirestore } from 'firebase/firestore';
import { DialogEditUser } from '../dialog-edit-user/dialog-edit-user';
import { DialogEditAddress } from '../dialog-edit-address/dialog-edit-address';
import { DialogConfirm } from '../dialog-confirm/dialog-confirm';

@Component({
  selector: 'app-user-detail',
  imports: [
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss',
})
export class UserDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private firestore = getFirestore();

  user = signal<any>(null);
  loading = signal(true);

  ngOnInit(): void {
    this.loadUser();
  }

  private loadUser(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    getDoc(doc(this.firestore, 'users', id)).then((snapshot) => {
      this.user.set({ id: snapshot.id, ...snapshot.data() });
      this.loading.set(false);
    });
  }

  initials(): string {
    const u = this.user();
    if (!u) {
      return '';
    }
    return `${u.firstName?.[0] ?? ''}${u.lastName?.[0] ?? ''}`.toUpperCase();
  }

  private readonly palette = [
    '#e57373',
    '#64b5f6',
    '#81c784',
    '#ffd54f',
    '#ba68c8',
    '#4db6ac',
    '#ff8a65',
    '#90a4ae',
  ];

  headerColor(): string {
    const u = this.user();
    if (!u) {
      return this.palette[0];
    }
    const hash = [...(u.id as string)].reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
    return this.palette[hash % this.palette.length];
  }

  editUser(): void {
    this.dialog
      .open(DialogEditUser, { data: this.user() })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.loadUser();
        }
      });
  }

  editAddress(): void {
    this.dialog
      .open(DialogEditAddress, { data: this.user() })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.loadUser();
        }
      });
  }

  deleteUser(): void {
    const id = this.user()?.id;
    if (!id) {
      return;
    }
    this.dialog
      .open(DialogConfirm, {
        data: {
          title: 'Delete user',
          message: 'Are you sure you want to delete this user? This action cannot be undone.',
          confirmLabel: 'Delete',
          cancelLabel: 'Cancel',
        },
      })
      .afterClosed()
      .subscribe(async (confirmed) => {
        if (confirmed) {
          await deleteDoc(doc(this.firestore, 'users', id));
          this.router.navigate(['/user']);
        }
      });
  }
}
