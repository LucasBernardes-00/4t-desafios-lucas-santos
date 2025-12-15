import { Routes } from "@angular/router"
import { ListarPlanoComponent } from "./listar-plano/listar-plano.component"
import { NovoPlanoComponent } from "./novo-plano/novo-plano.component"

export const PLANOS_ROUTES: Routes = [
  { 
    path: 'listar',
    component: ListarPlanoComponent
  },
  {
    path: 'novo',
    component: NovoPlanoComponent
  },
  {
    path: 'editar',
    component: NovoPlanoComponent
  }
]
