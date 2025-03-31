import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'cv',
    loadComponent: () =>
      import('./pages/curriculum/curriculum.component').then(
        (c) => c.CurriculumComponent
      ),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/project/project.component').then(
        (c) => c.ProjectComponent
      ),
    children: [
      {
        path: '',
        redirectTo: 'projects',
        pathMatch: 'full',
      },
      {
        path: 'form',
        loadComponent: () =>
          import('./components/user-form/user-form.component').then(
            (c) => c.UserFormComponent
          ),
      },
      {
        path: 'todo',
        loadComponent: () =>
          import('./components/todo-list/todo-list.component').then(
            (c) => c.TodoListComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
