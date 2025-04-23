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
        (c) => c.CurriculumComponent,
      ),
    // loadChildren: () => import('./pages/curriculum/curriculum.routes').then((c) => c.routes)
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/project/project.component').then(
        (c) => c.ProjectComponent,
      ),
  },
  {
    path: 'projects/wow',
    loadComponent: () =>
      import('./pages/project-wow/project-wow.component').then(
        (c) => c.ProjectWowComponent,
      ),
  },
  {
    path: 'projects/form',
    loadComponent: () =>
      import('./pages/form-page/form-page.component').then(
        (c) => c.FormPageComponent,
      ),
  },
  {
    path: 'projects/anim',
    loadComponent: () =>
      import('./pages/project-anim/project-anim.component').then(
        (c) => c.ProjectAnimComponent,
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
