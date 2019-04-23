import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ItemDataService {
  //list = index of Tab: 0->shoppingList; 1->pantrylist
  shoppingList:any;
  //{[key:string]:{name: newName, list:list, date:newDate,selected:false,expanding:false,tags:tags}}
  expandingItem:any={expanding:true};//dummy
  undoList:any;
  count:number;//keep track of total number of items, serves as the key for next item.

  constructor(public storage: Storage) {
      this.shoppingList= {};
      this.undoList=false;
      this.count = 0;
      this.storage.get('shoppingList').then((val)=>{
        console.log(val)
        if(val!=null){
          this.shoppingList=val;
        }
      }
    )
  }

  //validating list index to be 1 or 0
  __validateList(list:number){
    try{
      if(list!=0 && list!=1) throw " doesn't exist!"
    }
    catch(err){
      console.log('list'+list+err)
    }
  }


  //add new item from input form
  addNewItem(list: number, newName:string, newDate:string='', tags:Array<string>=[]){
    this.__validateList(list);
    newName=newName.trim();
    if(newName.length!=0){
      var key=this.__grabExist(newName, list);
      if(key==null){
        key=this.count.toString();
        this.shoppingList[key]=this.shoppingList[key]={name: newName, list:list, date: newDate,selected:false,expanding:false,tags:tags};
        this.count += 1;
      }
      this.displayDetail(this.shoppingList[key]);
    }
  }

  //If an item exists, grab it to the current page
  __grabExist(newInput: string, list: number){
    for(var key in this.shoppingList){
      if(this.shoppingList[key].name.toLowerCase() === newInput.toLowerCase()){
        this.shoppingList[key].list = list;
        return key;
      }
    }
  }

  //Making sure at most one item expands at a time
  async displayDetail(item){
    if(this.expandingItem!==item){
      this.expandingItem.expanding=false;
      this.expandingItem=item;
    }
    item.expanding=!item.expanding;
  }

  //delete the selected items given list index
  delete(list:number){
    this.__validateList(list);
    this.undoList=Object.assign({},this.shoppingList);
    for(var i in this.shoppingList){
      if(this.shoppingList[i].selected && this.shoppingList[i].list==list){
        delete this.shoppingList[i];
      }
    }
   }

   //move selected items to another page given current page
  massMoveItem(curList:number){
     this.__validateList(curList);
     var that=this;
     var promise=new Promise(function(resolve, reject){
       that.undoList=Object.assign({},that.shoppingList);resolve(that.undoList);
       console.log(that.undoList)
     });


     promise.then(function(r) {
     for(var key in that.shoppingList){
       if(that.shoppingList[key].selected && that.shoppingList[key].list==curList){
         let dest=Math.abs(curList-1);
         that.__swipe(key,dest);
         if(curList==0){
           that.shoppingList[key].date=that.__updateDate();
         }
       }
     }
     })

     console.log(this.shoppingList)
   }

   __copy(){
     this.undoList = Object.assign({},this.shoppingList);
   }

   //swipe a single item to another page
   __swipe(key:string,destiList:number){
     this.shoppingList[key].list=destiList;
     this.shoppingList[key].selected=false;
   }

   __undo(){
     try{
       if(this.undoList==false) throw 'undoList is empty!'
       this.shoppingList=Object.assign({},this.undoList);
       this.undoList=false;
        console.log('finish')
        console.log(this.shoppingList)
     }catch(err){
       console.log('err when undo '+err)
     }
   }

   __updateDate(){
     var now = new Date();
     return now.toISOString();
   }

   //update an item on its newName/newDate/change on tags
   updateItem(key:string,
              newName:string=null,
              newDate:string=null,
              newTag:string=null,
              delTag:string=null){
     let item=this.shoppingList[key];
     if(newName){item.name=newName;}
     if(newDate){item.date=newDate;}
     if(newTag){item.tags.push(newTag);}
     if(delTag){
       var index=item.tags.indexOf(delTag);
       item.tags.splice(index,1);
     }
   }

   //check if any items are selected on the current page
   checkSelect(list:number){
     this.__validateList(list);
     for(var key in this.shoppingList){
       if(this.shoppingList[key].selected && this.shoppingList[key].list==list){
         return true;
       }
     }
     return false;
   }

   __now(){
     let now=new Date();
     var m=(now.getMonth()+1)<10? '0'+(now.getMonth()+1).toString():(now.getMonth()+1).toString();
     return (now.getFullYear().toString()+'-'+m+'-'+now.getDate().toString());
   }

   __past(){
     let now=new Date();
     return (now.getFullYear()-5).toString();
   }

   
   searchTag(list:number, searchText:string){
     if (searchText == '') return this.shoppingList;

     var searchTags = searchText.split(',');
     if(searchTags[searchTags.length-1]==''){searchTags.pop();}

     let results = {};
     for (var key in this.shoppingList){//loop items
       var tags=this.shoppingList[key].tags;
       var check=0;
       for(var si=0;si<searchTags.length;si++){//loop target tags
         var stag=searchTags[si].trim();

         for(var tag of tags){
           if((tag.indexOf(stag)==0 || tag[tag.indexOf(stag)-1]==' ')
           && this.shoppingList[key].list==list){
             check=check|(1<<si);
           }
         }
       }
       if(((1<<(searchTags.length))-1)==check){//if all target tags are hit, add this item
         results[key]=this.shoppingList[key];
       }
     }
     return results;
   }




}
