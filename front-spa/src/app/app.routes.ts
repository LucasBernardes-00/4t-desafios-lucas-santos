import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'beneficiario',
    loadChildren: () => import('./pages/beneficiario/beneficiario.routes').then(m => m.BENEFICIARIOS_ROUTES)
  },
  {
    path: 'plano',
    loadChildren: () => import('./pages/plano/plano.routes').then(m => m.PLANOS_ROUTES)
  }
];
