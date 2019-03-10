import { Component } from '@angular/core';
import "hammerjs";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  newItem:any;
  items:Array<{name:string,bought:boolean,amount:any,note:string,selected:boolean}>;
  public expandDetail:boolean;
  example:any={name:'example',bought:false,amount:2,note:'dont forgot',selected:false};
  constructor(){
    this.items=[];
    this.newItem='';
    this.expandDetail=false;
  }

  //Add a new Item
  addNewItem(newitem:string){
    if(newitem.trim().length!=0){
      let item={name:newitem.trim(),bought:false,amount:1,note:'N/A',selected:false};
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

displayDetail(item){
  console.log('want to expand');
  this.expandDetail=!this.expandDetail;
}
  swipeLeftEvent($event){
    console.log('swiperight');
  }


}
