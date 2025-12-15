import { Routes } from "@angular/router";
import { NovoBeneficiario } from "./novo-beneficiario/novo-beneficiario";

import { ListarBeneficiario } from "./listar-beneficiario/listar-beneficiario";

export const BENEFICIARIOS_ROUTES: Routes = [
  { 
    path: 'listar',
    component: ListarBeneficiario
  },
  {
    path: 'novo',
    component: NovoBeneficiario
  },
  {
    path: 'editar',
    component: NovoBeneficiario
  }
]
