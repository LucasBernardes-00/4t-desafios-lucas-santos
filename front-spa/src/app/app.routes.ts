import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'teste',
    loadComponent: () => import('./pages/page-teste/page-test.component').then((m) => m.PageTeste)
  }
];
