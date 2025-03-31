import { Component, DestroyRef, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  imports: [],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  readonly #todoService = inject(TodoService);
  todoSuscription!: Subscription;
  readonly #destroyRef = inject(DestroyRef);
  todoSignal = toSignal(
    this.#todoService.getTodos().pipe(
      catchError((error) => {
        console.error('mensaje de error adecuado :) :', error);
        return of([]);
      })
    )
  );

  ngOnInit(): void {
    this.todoSuscription = this.#todoService
      .getTodos()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((todos) => {
        console.log(todos);
      });
  }

  // ngOnDestroy(): void {
  //   this.todoSuscription.unsubscribe();
  // }
}
