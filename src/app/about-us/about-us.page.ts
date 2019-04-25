import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { ItemDataService } from '../services/item-data.service'
import { ComboDetailComponent } from '../components/combo-detail/combo-detail.component'
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
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
export class AboutUsPage implements OnInit {
  ngOnInit() {
  }
  newItem:any;
  page:number=1;
  searchText:string;
  shownItems:{};

  constructor(public itemData:ItemDataService, public modalController:ModalController){
    this.newItem='';
    this.searchText='';
    this.shownItems = this.itemData.shoppingList;
  }

  addNewItem(){
    this.itemData.addNewItem(1,this.newItem);
    this.newItem='';
  }


   swipeToshoppingList(key){
     this.itemData.__swipe(key,0);
   }

   trackByListType(index:number,item){
     return item.key+item.value.list;
   }


  async createDish(){
     const modal = await this.modalController.create({
      component: ComboDetailComponent,
      cssClass: 'combo-detail-modal'
     });
     modal.onDidDismiss().then((data)=>{
       if(data.role=='save'){
         console.log(data.data.materials)
         // this.itemData.addNewItem(0,data.data.newItem,data.data.date,data.data.tagArray);
         // this.newItem='';
       }
       this.newItem='';
     });
     return await modal.present();
   }


}
