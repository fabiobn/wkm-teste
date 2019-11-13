import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'financeiro', pathMatch: 'full' },
  { path: 'financeiro', loadChildren: () => import('./financeiro/financeiro.module').then(m => m.FinanceiroModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
