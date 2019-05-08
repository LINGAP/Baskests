import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { ItemDataService } from '../services/item-data.service'
import { InputDetailComponent } from '../components/input-detail/input-detail.component'
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Storage } from '@ionic/storage';

import "hammerjs";
@Component({
  selector: 'app-shopping-tab',
  templateUrl: './shopping-tab.page.html',
  styleUrls: ['./shopping-tab.page.scss'],
  animations: [//https://www.joshmorony.com/animating-from-the-void-enter-and-exit-animations-in-ionic/
    //https://www.joshmorony.com/twitter-style-heart-like-animation-with-angular-animations-in-ionic/
    trigger('itemState', [
        transition(':leave', [
            animate('500ms ease-in'),
            style({transform: 'translateX(100%)'}),
        ]),
      ])
    ]
})
export class ShoppingTabPage implements OnInit {
  newItem:any;
  searchText:string;
  shownItems:{};

  ngOnInit() {
  }

  constructor(public modalController:ModalController,public itemData:ItemDataService){
    this.newItem='';
    this.searchText='';
    this.shownItems = this.itemData.shoppingList;
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

  async swipeToHistory(item){

    item.date = this.itemData.__updateDate();
    this.itemData.__swipe(item,1);
  }

  trackByListType(index:number,item:any){
    return index+'.'+item.list;
  }
}
