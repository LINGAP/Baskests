import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ExpandableDetailComponent } from './expandable-detail/expandable-detail.component'

@NgModule({
  declarations: [ExpandableDetailComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports:[ExpandableDetailComponent]
})
export class ComponentsModule { }
