import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from './models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  #apiUrl = 'https://jsonplaceholder.typicode.com/users';
  readonly #http = inject(HttpClient);

  getUsers(): Observable<User[]> {
    return this.#http.get<User[]>(this.#apiUrl);
  }
}
