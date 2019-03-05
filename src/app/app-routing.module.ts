import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {ItemDetailComponent} from './item-detail/item-detail.component';
const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'about-us', loadChildren: './about-us/about-us.module#AboutUsPageModule' },
   {path:'item-detail',loadChildren:'./item-detail/item-detail.component'}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents=[ItemDetailComponent]
