import { Component } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { ItemDataService } from '../services/item-data.service'
import { InputDetailComponent } from '../components/input-detail/input-detail.component'

import { Storage } from '@ionic/storage';

import "hammerjs";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  newItem:any;
  page:number=0;
  constructor(public modalController:ModalController,private itemData:ItemDataService){
    this.newItem='';
  }

  //Add a new Item
  addNewItem(newitem:string){
    this.itemData.addNewItem(newitem,this.itemData.getShoppingListItems());
    this.newItem='';
  }

  async addNewItemDetail(newItem:string){
    const modal = await this.modalController.create({
     component: InputDetailComponent,
     componentProps: { itemName:newItem },
     cssClass: 'input-detail-modal'
    });
    modal.onDidDismiss().then((data)=>{
      if(data.role=='save'){
        this.itemData.addNewItem(newItem,this.itemData.getShoppingListItems(),data.data.date,data.data.tagArray);
        this.newItem='';
      }
      this.newItem='';
    });
    return await modal.present();
  }

  //when checkbox was selected
  select(item){
    this.itemData.select(item);
  }

 //delete selected items
 delete(){
   this.itemData.delete(this.itemData.getShoppingListItems());
  }

//expand detail
async displayDetail(item){
  this.itemData.displayDetail(item);
}

moveToHistory(){
  this.itemData.moveToHistory();
}

swipeToHistory($event,key){
  console.log('!')
  this.itemData.swipeToHistory(key);
}




}
