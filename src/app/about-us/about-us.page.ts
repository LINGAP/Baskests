import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { ItemDataService } from '../services/item-data.service'
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {
  ngOnInit() {
  }
  newItem:any;
  page:number=1;
  detailExpandHeight:number=100;
  constructor(private itemData:ItemDataService){
    this.newItem='';
  }

  addNewItem(newitem:string){
    this.itemData.addNewItem(newitem,1);
    this.newItem='';
  }


  delete(){
    this.itemData.delete();
  }

   async displayDetail(item){
    this.itemData.displayDetail(item.value);
   }

   moveToShoppingList(){
     this.itemData.moveToShoppingList();
   }

   swipeToshoppingList(key){
     this.itemData.swipeToshoppingList(key);
   }

   trackByListType(index:number,item){
     return item.key+item.value.list+item.value.expanding;
   }

}
