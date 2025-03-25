import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'home',
    loadComponent: () => import('./pages/home/home.component').then((c) => c.HomeComponent)
  },
  {
    path:'projects',
    loadComponent: () => import('./pages/project/project.component').then((c) => c.ProjectComponent)
  },
  {
    path:'cv',
    loadComponent: () => import('./pages/curriculum/curriculum.component').then((c) => c.CurriculumComponent)
  },
  {
    path:'dragonball',
    loadComponent: () => import('./pages/dragonball-page/dragonball-page.component').then((c) => c.DragonballPageComponent)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
