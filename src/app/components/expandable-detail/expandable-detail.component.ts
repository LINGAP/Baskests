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
    this.unreasonableLength=false;
    this.newTag='';
  }

  ngOnInit() {}

  async addTag(event: MatChipInputEvent){
    const input = event.input;
   const value = event.value;

   // Add our tag
   if ((value || '').trim()) {
     if(value.length<=40){
       this.itemData.updateItem(this.item.key,null,value);
       // Reset the input value
       if (input) {
         input.value = '';
       }
     }else{
       const alert = await this.alertController.create({
        header: 'warning!',
        message: 'The maximum length for a tag is 40 characters!',
        buttons: [{
            text: 'Okay',
            role:'confirm',
            cssClass: 'secondary',
            handler: () => {
            }
        }]
      });
      await alert.present();
     }
   }


  }

  addTag2(){
    this.itemData.updateItem(this.item.key,null,this.newTag);
  }

  deleteTag(tag){
    this.itemData.updateItem(this.item.key,null,null,tag);
  }

}
