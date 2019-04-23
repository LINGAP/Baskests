import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ItemComponent } from './item/item.component'
import { ExpandableDetailComponent } from './expandable-detail/expandable-detail.component'
import { InputDetailComponent } from './input-detail/input-detail.component'
import { ComboDetailComponent } from './combo-detail/combo-detail.component'
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [ExpandableDetailComponent, InputDetailComponent, ComboDetailComponent, ItemComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports:[ExpandableDetailComponent, InputDetailComponent, ComboDetailComponent,ItemComponent],
  entryComponents:[InputDetailComponent, ComboDetailComponent]
})
export class ComponentsModule { }
