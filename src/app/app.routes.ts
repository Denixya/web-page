import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/project/project.component').then(
        (c) => c.ProjectComponent
      ),
  },
  {
    path: 'cv',
    loadComponent: () =>
      import('./pages/curriculum/curriculum.component').then(
        (c) => c.CurriculumComponent
      ),
  },
  {
    path: 'product-list',
    loadComponent: () =>
      import('./pages/product-list/product-list.component').then(
        (c) => c.ProductListComponent
      ),
  },
  {
    path: 'user-list',
    loadComponent: () =>
      import('./pages/user-list/user-list.component').then(
        (c) => c.UserListComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
