import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemDataService {
  //list = index of Tab
  historyItems:{[name:string]:{bought:boolean,date:string,selected:boolean,expanding:boolean,tags:Array<String>}}
  shoppingList:{[name:string]:{bought:boolean,date:string,selected:boolean,expanding:boolean,tags:Array<String>}}

  constructor() { this.historyItems={}; this.shoppingList={} }

  //add new item from input form
  addNewItem(newitem:string,list:any,date:string='--/--/--',tags:Array<string>=[]){
    if(newitem.trim().length!=0){
      let item={bought:false,date:date,selected:false,expanding:false,tags:tags};
      list[newitem.trim()]=item;
    }
  }


  //when checkbox was selected
  select(item){
    item.value.selected=!item.value.selected;
    console.log('now:'+item.value.selected);
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
         this.swipe(key,this.shoppingList,this.historyItems);
         this.updateDate(key);
         delete this.shoppingList[key];
       }
     }
   }

   swipeToHistory(key){
     this.swipe(key,this.shoppingList,this.historyItems);
     this.updateDate(key);
     delete this.shoppingList[key];
   }

   swipe(key:string,s1,s2){
     s2[key]=s1[key];
     s2[key].selected=false;
   }
   //helper func to moveToHistory
   updateDate(key){
     var now = new Date();
     var updatedDate=(now.getMonth()+1).toString()+'/'+now.getDate().toString()+'/'+now.getFullYear().toString().substring(2);
     this.historyItems[key].date=updatedDate;
   }

   moveToShoppingList(){
     for(var key in this.historyItems){
       if(this.historyItems[key].selected){
         this.swipe(key,this.historyItems,this.shoppingList);
       }
     }
   }

   swipeToshoppingList(key){
     this.swipe(key,this.historyItems,this.shoppingList);
   }

   addTag(list,key,tag){
     if(list===0){
       this.addTagHelper(this.shoppingList,this.historyItems,key,tag);
     }else{
       this.addTagHelper(this.historyItems,this.shoppingList,key,tag);
     }
   }

   addTagHelper(s1,s2,key,tag){
     s1[key].tags.push(tag);
     if(s2[key]){
       s2[key].tags.push(tag);
     }
   }

   deleteTag(list,key,tag){
     if(list===0){
       this.deleteTagHelper(this.shoppingList,this.historyItems,key,tag);
     }else{
       this.deleteTagHelper(this.historyItems,this.shoppingList,key,tag);
     }
   }

   deleteTagHelper(s1,s2,key,tag){
     var index=s1[key].tags.indexOf(tag);
     s1[key].tags.splice(index,1);
     if(s2[key]){
       index=s2[key].tags.indexOf(tag);
       s2[key].tags.splice(index,1);
     }
   }

   changeDate(key,newDate){
      }

      changeDateHelper(s1,s2,key,newDate){
        s1[key].date=newDate;
        if(s2[key]){
          s2[key].date=newDate;
        }
      }



}
