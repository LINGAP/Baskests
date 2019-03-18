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
    this.itemData.addNewItem(newitem,this.itemData.getHistoryItems());
    this.newItem='';
  }

  select(item){
    this.itemData.select(item);
  }

  delete(){
    this.itemData.delete(this.itemData.getHistoryItems());
  }

   async displayDetail(item){
    this.itemData.displayDetail(item);
   }

   moveToShoppingList(){
     this.itemData.moveToShoppingList();
   }

}
