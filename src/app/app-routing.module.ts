import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'tab1', loadChildren:'./tab1/tab1.module#Tab1PageModule'},
  { path: 'pantry-tab', loadChildren: './pantry-tab/pantry-tab.module#PantryTabPageModule' },
  { path: 'shopping-tab', loadChildren: './shopping-tab/shopping-tab.module#ShoppingTabPageModule' },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
