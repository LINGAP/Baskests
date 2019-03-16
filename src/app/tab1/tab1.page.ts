import { Component } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { ExpandableDetailComponent } from '../components/expandable-detail/expandable-detail.component';
import { ItemDataService } from '../services/item-data.service'
import "hammerjs";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  newItem:any;
  //items:Array<{name:string,bought:boolean,amount:any,note:string,selected:boolean,expanding:boolean,tags:Array<String>}>;

  example:any={
    name:'example',bought:false,amount:2,note:'dont forgot',selected:false, expanding:false,tags:['weekly','Lorde']
  };
  detailExpandHeight:number=100;

  constructor(public modalController:ModalController,private itemData:ItemDataService){
    this.newItem='';
  }

  //Add a new Item
  addNewItem(newitem:string){
    this.itemData.addNewItem(newitem,this.itemData.getShoppingListItems());
    this.newItem='';
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



}
