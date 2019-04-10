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
  // animations: [//https://www.joshmorony.com/animating-from-the-void-enter-and-exit-animations-in-ionic/
  //   //https://www.joshmorony.com/twitter-style-heart-like-animation-with-angular-animations-in-ionic/
  //   trigger('itemState', [
  //       transition(':enter', [
  //           style({transform: 'translateY(100%)'}),
  //           animate('500ms ease-out')
  //       ]),
  //       transition(':leave', [
  //           animate('500ms ease-in'),
  //           style({transform: 'translateX(100%)'}),
  //       ]),
  //   ])
  //   ]
})
export class Tab1Page {
  newItem:any;
  newName:any;
  newDate:any;
  page:number=0;
  searchTag:string;

  constructor(public modalController:ModalController,public itemData:ItemDataService,private changeDetector: ChangeDetectorRef){
    this.newItem='';
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
console.log("-------> delete!!")
   this.itemData.delete(0);
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
  return item.value.name+item.value.list;
}

async edit(item, field){
console.log("-------> started edit")
    item.value.editing = true;
    this.newName = '';
    this.newDate = '';
    if(field == 0){
      this.itemData.shoppingList[item.key].name = this.newName;
    }
    if(field == 1){
      this.itemData.shoppingList[item.key].date = this.newDate;
    }
console.log("-------> ended edit")
}

searchInputChange(){
  console.log(this.searchTag);
}

async focusTest(){
  console.log("You did it!")
}

}
