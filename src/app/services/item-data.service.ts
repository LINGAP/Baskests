import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ItemDataService {
  //list = index of Tab: 0->shoppingList; 1->pantrylist
  shoppingList:any;
  selectedCount0:number=0;
  selectedCount1:number=0;
  //{[name:string]:{list:number,date:string,selected:boolean,expanding:boolean,tags:Array<String>}}
  expandingItem:any={expanding:true};//dummy
  count:number;

  constructor(public storage: Storage) {
    this.shoppingList= {};
    this.count = 0;
    this.storage.get('shoppingList').then((val)=>{
      console.log(val)
      if(val!=null){
        this.shoppingList=val;
      }
    }
  )
  //  if(this.storage.get('shoppingList'))
  }

  //storage
  storeSet(settingName,value){
    return this.storage.set(`setting:${ settingName }`,value);
  }

  async storeGet(settingName){
    return await this.storage.get(`setting:${ settingName}`);
  }

  async storeRemove(settingName){
    return await this.storage.remove(`setting:${ settingName}`);
  }


  //add new item from input form
  addNewItem(newitem:string,list:number,date:string='--/--/--',tags:Array<string>=[]){
    newitem=newitem.trim();
    if(newitem.length!=0){
      var key=this.grabExist(newitem, list);
      if(key==null){
        var original={name: newitem, list:list,date:date,selected:false,expanding:false,tags:tags};
        key=this.count.toString();
        this.shoppingList[key]=original;
        this.count += 1;
      }
      this.displayDetail(this.shoppingList[key]);
    }


    this.storeSet('shoppingList',this.shoppingList);
    this.storeGet('shoppingList').then((val)=>{
      console.log(val)
    })
  }

  grabExist(newInput: string, whichList: number){
    for(var i in this.shoppingList){
      if(this.shoppingList[i].name.toLowerCase() == newInput.toLowerCase()){
        this.shoppingList[i].list = whichList;
        return i;
      }
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
  delete(list:number){
    for(var i in this.shoppingList){
      if(this.shoppingList[i].selected && this.shoppingList[i].list==list){
        delete this.shoppingList[i];
        if(list==0){
          this.selectedCount0-=1;
        }else{this.selectedCount1-=1;
        // console.log('1: '+this.selectedCount1)
        }
      }
    }
   }

   moveToHistory(){
     for(var key in this.shoppingList){
       if(this.shoppingList[key].selected  && this.shoppingList[key].list==0){
         this.swipe(key,1);
         this.shoppingList[key].date= this.updateDate();
         this.selectedCount0-=1;
         // console.log('0: '+this.selectedCount0)
       }
     }
   }

   swipeToHistory(key){
     if(this.shoppingList[key].selected && this.shoppingList[key].list==0){
       this.selectedCount0-=1;
     }
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
       if(this.shoppingList[key].selected  && this.shoppingList[key].list==1){
         this.swipe(key,0);
         this.selectedCount1-=1;
         // console.log('1: '+this.selectedCount1)
       }
     }
   }

   swipeToshoppingList(key){
     if(this.shoppingList[key].selected && this.shoppingList[key].list==1){
       this.selectedCount1-=1;
     }
     this.swipe(key,0);
   }

   addTag(key,tag){
     this.shoppingList[key].tags.push(tag);
   }

   deleteTag(key,tag){
     var index=this.shoppingList[key].tags.indexOf(tag);
     this.shoppingList[key].tags.splice(index,1);
   }

   checkSelect(item,list){
     if(list==0){
       this.selectedCount0= this.helperCheck(item,this.selectedCount0);
       // console.log('0: '+this.selectedCount0)
     }else{
       this.selectedCount1= this.helperCheck(item,this.selectedCount1);
       // console.log('1: '+this.selectedCount1)
     }
   }

   helperCheck(item,list){
     if(item.value.selected){
       list-=1;
     }else{
       list+=1;
     }
     return list;
   }


// we'll have to decide if we're okay w/ the mutating data
   async changeName(key, newName){
     this.shoppingList[key].name = newName;
   }

   async changeDate(currEditItem, newContent){
     this.shoppingList[currEditItem].date = newContent;
     console.log(currEditItem);
   }



}
