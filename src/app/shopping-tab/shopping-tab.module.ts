import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShoppingTabPage } from './shopping-tab.page';
import { ComponentsModule } from '../components/components.module'
const routes: Routes = [
  {
    path: '',
    component: ShoppingTabPage
  }
];

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShoppingTabPage]
})
export class ShoppingTabPageModule {}
