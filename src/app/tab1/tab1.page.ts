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
  newName:any;
  newDate:any;
  page:number=0;
  itemEditing:boolean;
  // implement ionBlur here so that it doesn't sync up all the things
  constructor(public modalController:ModalController,private itemData:ItemDataService){
    this.newItem='';
    this.itemEditing=false;
  }

  //Add a new Item
  addNewItem(newitem:string){
    this.itemData.addNewItem(newitem,0);
    this.newItem='';
    this.newName= '';
    this.newDate='--/--/--';
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
   this.itemData.delete();
  }

//determines whether the item has been tapped once or twice and which edit
//
// async displayOrEdit($event, item, type){
//   if($event.tapCount == 2){
//     if(type==0){
//       this.itemData.changeName(item.key, this.newName);
//       this.newName = item.key;
//     }
//     if(type==1){
//       this.itemData.changeDate(item.key, this.newDate);
//       this.newDate = item.value.date;
//     }
//     this.itemEditing=true;
//   }
//   else{
//     this.displayDetail(item);
//   }
// }

//expand detail
async displayDetail(item){
  this.itemData.displayDetail(item.value);
}

moveToHistory(){
  this.itemData.moveToHistory();
}

swipeToHistory(key){
  this.itemData.swipeToHistory(key);
}

trackByListType(index:number,item:any){
  return item.value.name+item.value.list;
}

async edit(item, field){
    if(field == 0){
      this.itemData.changeName(item.key, this.newName);
      item.key = this.newName;
      this.newName = '';
    }
    if(field == 1){
      this.itemData.changeDate(item.key, this.newDate);
      item.value.date = this.newDate;
      this.newDate = '';

    }
    item.value.editing = true;
}

async focusTest(){
  console.log("You did it!")
}

}
