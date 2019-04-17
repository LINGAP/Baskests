import { Component, ChangeDetectorRef } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { ItemDataService } from '../services/item-data.service'
import { InputDetailComponent } from '../components/input-detail/input-detail.component'
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Storage } from '@ionic/storage';

import "hammerjs";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  animations: [//https://www.joshmorony.com/animating-from-the-void-enter-and-exit-animations-in-ionic/
    //https://www.joshmorony.com/twitter-style-heart-like-animation-with-angular-animations-in-ionic/
    trigger('itemState', [
        transition(':enter', [
            style({transform: 'translateY(100%)'}),
            animate('500ms ease-out')
        ]),
        transition(':leave', [
            animate('500ms ease-in'),
            style({transform: 'translateX(100%)'}),
        ]),
    ])
    ]
})
export class Tab1Page {
  newItem:any;
  page:number=0;
  searchText:string;
  shownItems:{};


  constructor(public modalController:ModalController,public itemData:ItemDataService, private changeDetector: ChangeDetectorRef){
    this.newItem='';
    this.shownItems = this.itemData.shoppingList;
  }

  //Add a new Item
  addNewItem(){
    this.itemData.addNewItem(0,this.newItem);
    this.newItem='';
  }

  async addNewItemDetail(newItem:string){
    if(newItem!=''){
      const modal = await this.modalController.create({
       component: InputDetailComponent,
       componentProps: { itemName:newItem },
       cssClass: 'input-detail-modal'
      });
      modal.onDidDismiss().then((data)=>{
        if(data.role=='save'){
          this.itemData.addNewItem(0,newItem,data.data.date,data.data.tagArray);
          this.newItem='';
        }
        this.newItem='';
      });
      return await modal.present();
    }
  }

 //delete selected items
 delete(){
   this.itemData.delete(0);
  }


  //expand detail
  async displayDetail(item){
    this.itemData.displayDetail(item.value);
  }

  moveToHistory(){
    this.itemData.massMoveItem(0);
  }

  async swipeToHistory(key){
    this.itemData.__swipe(key,1);
    this.itemData.shoppingList[key].date= this.itemData.__updateDate();
  }

  trackByListType(index:number,item:any){
    return item.key+item.value.list;
  }

  async edit(item, field){
      item.value.editing = true;
  }

  save(item){
    item.value.editing=false;
  }

  searchTag(){
    this.shownItems = this.itemData.searchTag(0,this.searchText);
  }


}
