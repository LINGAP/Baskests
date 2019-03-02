import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  item:any = {
    name:'',
    amount:'',
    bought:false
  }

  items:array<item>;
  constructor(){this.items=[]}

  addNewItem(newitem:string){
    let item:item={name:newitem,bought:false};
    this.items.push(item);
    this.newItem='';
  }

  bought($event,item:item){
    item.bought=item.bought==false? true:false;
    console.log(item.bought);
  }

  delete(item:item){
    console.log('try to delete sth');
    let delIndex=items.indexOf(item);
    items.splice(delIndex,1);
    console.log('probably didnt succeed.')
  }
}
