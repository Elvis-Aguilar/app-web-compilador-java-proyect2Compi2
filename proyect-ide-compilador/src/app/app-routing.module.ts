import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'compilador',
    loadChildren: () => import('./area-editor/area-editor.module').then( m => m.AreaEditorModule )
  },
  {
    path: '**',
    redirectTo: 'compilador'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
