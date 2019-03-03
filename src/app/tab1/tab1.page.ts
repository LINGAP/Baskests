import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  items:array<{name:string,bought:boolean,amount:any,note:string}>;
  constructor(){this.items=[]}

  addNewItem(newitem:string){
    let item={name:newitem,bought:false};
    this.items.push(item);
    this.newItem='';
  }

  bought(item){
    item.bought=!item.bought;
    console.log(item.bought);
  }

  delete(item){
    console.log('try to delete sth');
    let delIndex=items.indexOf(item);
    items.splice(delIndex,1);
    console.log('probably didnt succeed.')
  }
}
