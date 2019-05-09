import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { ItemDataService } from '../services/item-data.service'
import { trigger, state, style, animate, transition } from '@angular/animations';

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
  newItem:string;
  searchText:string;

  ngOnInit() {
  }

  constructor(public itemData:ItemDataService){
    this.newItem='';
    this.searchText='';
  }

  async swipeToHistory(item){
    item.date = this.itemData.__updateDate();
    this.itemData.__swipe(item,1);
  }

  trackByListType(index:number,item:any){
    return index+'.'+item.list;
  }
}
