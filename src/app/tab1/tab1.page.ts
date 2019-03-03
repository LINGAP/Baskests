import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  newItem:any;
  items:Array<{name:string,bought:boolean,amount:any,note:string}>;
  constructor(){this.items=[]}

  addNewItem(newitem:string){
    let item={name:newitem,bought:false,amount:1,note:'N/A'};
    this.items.push(item);
    this.newItem='';
  }

  bought(item){
    item.bought=!item.bought;
    console.log(item.bought);
  }

  delete($event,item){
    console.log('try to delete sth');
    let delIndex=this.items.indexOf(item);
    this.items.splice(delIndex,1);
    console.log('probably didnt succeed.')
  }
}
