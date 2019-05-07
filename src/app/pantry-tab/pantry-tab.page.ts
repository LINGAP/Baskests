import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { ItemDataService } from '../services/item-data.service'

import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-pantry-tab',
  templateUrl: './pantry-tab.page.html',
  styleUrls: ['./pantry-tab.page.scss'],
  animations: [//https://www.joshmorony.com/animating-from-the-void-enter-and-exit-animations-in-ionic/
    //https://www.joshmorony.com/twitter-style-heart-like-animation-with-angular-animations-in-ionic/
    trigger('itemState', [
        transition(':leave', [
            animate('500ms ease-in'),
            style({transform: 'translateX(-100%)'}),
        ]),
    ])
    ]
})
export class PantryTabPage implements OnInit {

  ngOnInit() {
  }

  constructor(public itemData:ItemDataService, public modalController:ModalController){}


   swipeToshoppingList(key){
     this.itemData.__swipe(key,0);
   }

   trackByListType(index:number,item){
     return item.key+item.value.list;
   }

}
