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
  undoPage:number;

  constructor(public storage: Storage) {
      this.storage.clear();
      this.shoppingList= [];

      this.undoList=false;//not used
      this.undoPage=-1;//not used

      this.storage.get('shoppingList').then((val)=>{
        if(val!=null){
          this.shoppingList=val;
        }
      })

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
      var key=this.__grabExist(newName);
      if(key==null){
        key = this.shoppingList.length;
        this.shoppingList.push({name: newName, list:list, date: newDate,selected:false,expanding:false, tags:tags, show:true});

      }else{
        this.shoppingList[key].list = list;
      }
      this.displayDetail(this.shoppingList[key]);
    }

    // console.log(this.shoppingList)

    this.storage.set('shoppingList',this.shoppingList);
  }

  //If an item exists, grab it to the current page
  __grabExist(newInput: string){
    for(var key in this.shoppingList){
      if(this.shoppingList[key].name.toLowerCase() === newInput.toLowerCase()){
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
    // this.undoList=Object.assign({},this.shoppingList);
    // this.undoPage=list;

    let i=this.shoppingList.length-1;
    while(i>-1){
      if(this.shoppingList[i].selected && this.shoppingList[i].list==list){
        this.shoppingList.splice(i,1);
      }
      i-=1;
    }

    this.storage.set('shoppingList',this.shoppingList);
   }

   //move selected items to another page given current page
  massMoveItem(curList:number){
     this.__validateList(curList);

     // this.undoList=Object.assign({},this.shoppingList);
     // this.undoPage=curList;

     for(var item of this.shoppingList){

       if(item.selected && item.list==curList){
         let dest=Math.abs(curList-1);
         this.__swipe(item,dest);
         if(curList==0){
           item.date=this.__updateDate();
         }
       }
     }

     this.storage.set('shoppingList',this.shoppingList);
   }

   __swipe(item:any,destiList:number){

     item.list=destiList;
     item.selected=false;

     this.storage.set('shoppingList',this.shoppingList);
   }

   __undo(){
     try{
       if(this.undoList==false) throw 'undoList is empty!'
       this.shoppingList=Object.assign({},this.undoList);
       this.undoList=false;
       this.undoPage=-1;
     }catch(err){
       console.log('err when undo '+err)
     }
   }

   __updateDate(){
     var now = new Date();
     return now.toISOString();
   }

   //update an item on its newName/newDate/change on tags
   updateItem(item:any,
              newName:string=null,
              newTag:string=null,
              delTag:string=null){

     if(newName){item.name=newName;}
     if(newTag){item.tags.push(newTag);}
     if(delTag){
       var index=item.tags.indexOf(delTag);
       item.tags.splice(index,1);
     }

     this.storage.set('shoppingList',this.shoppingList);
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
     var d=(now.getDate())<10? '0'+now.getDate().toString():now.getDate().toString();
     return now.getFullYear().toString()+'-'+m.toString()+'-'+d;
   }

   __past(){
     let now=new Date();
     return (now.getFullYear()-5).toString();
   }


   searchTag(list:number, searchText:string){
     this.storage.get('search'+list).then((val)=>{
      // console.log('search'+list+':'+val)
       if(val!=null){
         searchText=val;
       }
     }
   )

     var searchTags = searchText.split(',');
     searchTags=searchTags.filter(i=>i!=='');


     for (var key in this.shoppingList){//loop items
       var tags=this.shoppingList[key].tags;
       var check=0;
       for(var si=0;si<searchTags.length;si++){//loop target tags
         var stag=searchTags[si].trim().toLowerCase();

         for(var tag of tags){//loop item tags
           tag=tag.toLowerCase();
           if((tag.indexOf(stag)==0 || tag[tag.indexOf(stag)-1]==' ')
           && this.shoppingList[key].list==list){
             check=check|(1<<si);
           }
         }
       }

       if(((1<<(searchTags.length))-1)!=check){//if all target tags are hit, add this item
         this.shoppingList[key].show=false;
       }else{
         this.shoppingList[key].show=true;
       }
     }

     if(searchText==''){
       for(var key in this.shoppingList){
         this.shoppingList[key].show=true;
       }
     }

     this.storage.set(list+'search', searchText);

   }




}
