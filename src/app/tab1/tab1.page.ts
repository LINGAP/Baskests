import { Component } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { ExpandableDetailComponent } from '../components/expandable-detail/expandable-detail.component';
import "hammerjs";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  newItem:any;
  items:Array<{name:string,bought:boolean,amount:any,note:string,selected:boolean,expanding:boolean,tags:Array<String>}>;

  example:any={
    name:'example',bought:false,amount:2,note:'dont forgot',selected:false, expanding:false,tags:['weekly','Lorde']
  };
  detailExpandHeight:number=200;

  constructor(public modalController:ModalController){
    this.items=[];
    this.newItem='';
  }

  //Add a new Item
  addNewItem(newitem:string){
    if(newitem.trim().length!=0){
      let item={name:newitem.trim(),bought:false,amount:1,note:'N/A',selected:false,expanding:false,tags:[]};
      this.items.push(item);
    }
    this.newItem='';
  }

  //when checkbox was selected
  select(item){
    item.selected=!item.selected;
  }

 //delete selected items
 delete(){
   for(var i=this.items.length-1;i>=0;i--){
     if(this.items[i].selected){
       this.items.splice(i,1);
     }
   }
  }

  //moveToHistory
  moveToHistory(){

  }

//expand detail
async displayDetail(item){
  item.expanding=!item.expanding;
}
  swipeLeftEvent(){
    console.log('swiperight');
  }


}
