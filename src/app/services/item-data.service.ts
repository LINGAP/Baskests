import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemDataService {
  //list = index of Tab: 0->shoppingList; 1->pantrylist
  shoppingList:{[index:string]:{name: string, list:number,date:string,selected:boolean,expanding:boolean, editing: boolean, tags:Array<String>}}
  expandingItem:any={expanding:true};//dummy
  count:number;


  constructor() {
    this.shoppingList={},
    this.count = 0;
  }

  //add new item from input form
  addNewItem(newitem:string,list:number,date:string='--/--/--',tags:Array<string>=[]){
    if(newitem.trim().length!=0){
      let item={name: newitem.trim(), list:list,date:date,selected:false,expanding:false,editing:false,tags:tags};
      this.shoppingList[this.count.toString()]=item;
      console.log(this.shoppingList);
      this.count += 1;
      this.displayDetail(item);
    }
  }

  //expand detail or not
  async displayDetail(item){
    if(this.expandingItem!==item){
      this.expandingItem.expanding=false;
      this.expandingItem=item;
    }
    item.expanding=!item.expanding;
 }

  //delete the selected items
  delete(){
    for(var i in this.shoppingList){
      if(this.shoppingList[i].selected){
        delete this.shoppingList[i];
      }
    }
   }

   moveToHistory(){
     for(var key in this.shoppingList){
       if(this.shoppingList[key].selected){
         this.swipe(key,1);
         this.shoppingList[key].date= this.updateDate();
       }
     }
   }

   swipeToHistory(key){
     this.swipe(key,1);
     this.shoppingList[key].date=this.updateDate();
   }

   swipe(key:string,destiList:number){
     this.shoppingList[key].list=destiList;
     this.shoppingList[key].selected=false;
   }
   //helper func to moveToHistory
   updateDate(){
     var now = new Date();
     var updatedDate=(now.getMonth()+1).toString()+'/'+now.getDate().toString()+'/'+now.getFullYear().toString().substring(2);
     return updatedDate;
   }

   moveToShoppingList(){
     for(var key in this.shoppingList){
       if(this.shoppingList[key].selected){
         this.swipe(key,0);
       }
     }
   }

   swipeToshoppingList(key){
     this.swipe(key,0);
   }

   addTag(key,tag){
     this.shoppingList[key].tags.push(tag);
   }

   deleteTag(key,tag){
     var index=this.shoppingList[key].tags.indexOf(tag);
     this.shoppingList[key].tags.splice(index,1);
   }

// we'll have to decide if we're okay w/ the mutating data
   async changeName(currEditItem, newContent){
     this.shoppingList[newContent] = this.shoppingList[currEditItem];
     //delete this.shoppingList[currEditItem];
   }

   async changeDate(currEditItem, newContent){
     this.shoppingList[currEditItem].date = newContent;
     console.log(currEditItem);
   }




}
