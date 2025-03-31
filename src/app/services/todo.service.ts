import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  #apiUrl = 'https://jsonplaceholder.typicode.com/todos';
  readonly #http = inject(HttpClient);
  todoUnsubscribe: any;

  getTodos(): Observable<Todo[]> {
    return this.#http.get<Todo[]>(this.#apiUrl);
  }
}
