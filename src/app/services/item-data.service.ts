import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemDataService {

  historyItems:{[name:string]:{bought:boolean,date:string,selected:boolean,expanding:boolean,tags:Array<String>}}
  shoppingList:{[name:string]:{bought:boolean,date:string,selected:boolean,expanding:boolean,tags:Array<String>}}

  constructor() { this.historyItems={}; this.shoppingList={} }

  getHistoryItems(){
    return this.historyItems;
  }

  getShoppingListItems(){
    return this.shoppingList;
  }
  //add new item from input form
  addNewItem(newitem:string,list:any){
    if(newitem.trim().length!=0){
      let item={bought:false,date:'--/--/--',selected:false,expanding:false,tags:[]};
      list[newitem.trim()]=item;
    }
  }

  //when checkbox was selected
  select(item){
    item.value.selected=!item.value.selected;
  }

  //expand detail or not
  async displayDetail(item){
    item.value.expanding=!item.value.expanding;
 }

  //delete the selected items
  delete(list){
    for(var i in list){
      if(list[i].selected){
        delete list[i];
      }
    }
   }

   //move the selected items to historyItems
   moveToHistory(){
     for(var key in this.shoppingList){
       if(this.shoppingList[key].selected){
         this.historyItems[key]=this.shoppingList[key];
         this.updateDate(key);
         delete this.shoppingList[key];
       }
     }
   }
   //helper func to moveToHistory
   updateDate(key){
     var now = new Date();
     var updatedDate=(now.getMonth()+1).toString()+'/'+now.getDate().toString()+'/'+now.getFullYear().toString().substring(2);
     this.historyItems[key].date=updatedDate;
   }



}
