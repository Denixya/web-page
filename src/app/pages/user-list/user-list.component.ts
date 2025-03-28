import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { catchError, of, Subscription } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [JsonPipe],
  providers: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  readonly #userService = inject(UserService);
  readonly #destroyRef = inject(DestroyRef);
  userSubscription!: Subscription;

  usersSignal = toSignal(
    this.#userService.getUsers().pipe(
      catchError((error) => {
        console.error('Error fetching users:', error);
        return of([]);
      })
    ),
    { initialValue: [] }
  );

  ngOnInit(): void {
    this.userSubscription = this.#userService
      .getUsers()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((users) => {
        console.log(users);
      });
  }
}
