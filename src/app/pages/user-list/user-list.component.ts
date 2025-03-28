import {
  AfterContentInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  imports: [],
  providers: [HttpClientModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  readonly #userService = inject(UserService);
  userSubscription!: Subscription;

  ngOnInit(): void {
    this.userSubscription = this.#userService
      .getUsers()
      .pipe(takeUntilDestroyed())
      .subscribe((users) => {
        console.log(users);
      });
  }
}
