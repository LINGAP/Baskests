import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ItemComponent } from './item/item.component'
import { SearchBarComponent } from './search-bar/search-bar.component'
import { ExpandableDetailComponent } from './expandable-detail/expandable-detail.component'
import { AddBarComponent } from './add-bar/add-bar.component'
import { ComboDetailComponent } from './combo-detail/combo-detail.component'
import { MatFormFieldModule } from '@angular/material/form-field';
import { HelpPopupComponent } from './help-popup/help-popup.component'
import { FormsModule } from '@angular/forms';

import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
@NgModule({
  declarations: [ExpandableDetailComponent, ComboDetailComponent, ItemComponent, SearchBarComponent, AddBarComponent, HelpPopupComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
  ],
  exports:[ExpandableDetailComponent, ComboDetailComponent,ItemComponent, SearchBarComponent, AddBarComponent, HelpPopupComponent],
  entryComponents:[ ComboDetailComponent, SearchBarComponent, AddBarComponent, HelpPopupComponent]
})
export class ComponentsModule { }
