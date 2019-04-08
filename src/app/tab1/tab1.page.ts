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
  itemState:string;
  searchTag:string;
  constructor(public modalController:ModalController,public itemData:ItemDataService,private changeDetector: ChangeDetectorRef){
    this.newItem='';
  }

  //Add a new Item
  addNewItem(newitem:string){
    this.itemData.addNewItem(newitem,0);
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
          this.itemData.addNewItem(newItem,0,data.data.date,data.data.tagArray);
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

  //determines whether the item has been tapped once or twice
  async displayOrEdit($event, key, newItem, item, num){
    if($event.tapCount==2){
      if(num==0){
        this.editName(key, newItem);
      }
      if(num==1){
        this.editDate(key, newItem);
      }
    }
    else{
      this.displayDetail(item);
    }
  }

  checkSelect(item){
    this.itemData.checkSelect(item,0);
  }

  //expand detail
  async displayDetail(item){
    this.itemData.displayDetail(item.value);
  }

  moveToHistory(){
    this.itemData.moveToHistory();
  }

  async swipeToHistory(key){
    console.log(this.itemData.shoppingList[key].list)

    this.itemData.swipeToHistory(key);
    this.changeDetector.detectChanges();
    console.log(this.itemData.shoppingList[key].list)
  }

  trackByListType(index:number,item:any){
    return item.key+item.value.list;
  }

  async editDate(key, newItem){
       this.itemData.changeDate(key, newItem);
  }

  async editName(key, newItem){
    this.itemData.changeName(key, newItem);
  }

  searchInputChange(){
    console.log(this.searchTag)
  }


}
