import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonViewComponent } from './views/person-view/person-view.component';
import { PersonsViewComponent } from './views/persons-view/persons-view.component';

const routes: Routes = [
  {
    path: 'personas',
    component: PersonsViewComponent //,
    // canActivate: [ AuthGuardService ]
  }, {
    path: '',
    component: PersonViewComponent //,
    // canActivate: [ AuthGuardService ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Covid19RoutingModule { }
