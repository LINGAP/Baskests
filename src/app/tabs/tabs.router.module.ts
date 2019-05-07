import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'shopping-tab',
        children: [
          {
            path: '',
            loadChildren: '../shopping-tab/shopping-tab.module#ShoppingTabPageModule'
          }
        ]
      },
      {
        path: 'pantry-tab',
        children: [
          {
            path: '',
            loadChildren: '../pantry-tab/pantry-tab.module#PantryTabPageModule'
          }
        ]
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/shopping-tab',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
