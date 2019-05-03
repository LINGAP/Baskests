import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ItemComponent } from './item/item.component'
import { SearchBarComponent } from './search-bar/search-bar.component'
import { ExpandableDetailComponent } from './expandable-detail/expandable-detail.component'
import { AddBarComponent } from './add-bar/add-bar.component'
import { InputDetailComponent } from './input-detail/input-detail.component'
import { ComboDetailComponent } from './combo-detail/combo-detail.component'
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
@NgModule({
  declarations: [ExpandableDetailComponent, InputDetailComponent, ComboDetailComponent, ItemComponent, SearchBarComponent, AddBarComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
  ],
  exports:[ExpandableDetailComponent, InputDetailComponent, ComboDetailComponent,ItemComponent, SearchBarComponent, AddBarComponent],
  entryComponents:[InputDetailComponent, ComboDetailComponent, SearchBarComponent, AddBarComponent]
})
export class ComponentsModule { }
