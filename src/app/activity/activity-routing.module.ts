import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActivityPage } from './activity.page';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ActivityPage,
      },
      {
        path: ':id',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityPageRoutingModule {}
