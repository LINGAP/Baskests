import { Component, OnInit,  Input} from '@angular/core';
import { ItemDataService } from '../../services/item-data.service'
import {MatChipInputEvent} from '@angular/material';
import { AlertController } from '@ionic/angular';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
@Component({
  selector: 'app-expandable-detail',
  templateUrl: './expandable-detail.component.html',
  styleUrls: ['./expandable-detail.component.scss'],
})
export class ExpandableDetailComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  unreasonableLength:boolean;
  @Input('expandItem') item;
  @Input('curPage')curPage;
  newTag:any;
  currentHeight:number=0;
  constructor(private itemData:ItemDataService, public alertController: AlertController) {
    this.newTag='';
  }

  ngOnInit() {}

  async addTag(event: MatChipInputEvent){
     const input = event.input;
     const value = event.value;

     // Add tag
     if ((value || '').trim()) {
         this.itemData.updateItem(this.item,null,value);
     }

     if (input) {
       input.value = '';
     }

  }

  deleteTag(tag){
    this.itemData.updateItem(this.item,null,null,tag);
  }

}
