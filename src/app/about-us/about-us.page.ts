import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {
  ngOnInit() {
  }

  newItem:any;
  items:Array<{name:string,bought:boolean,amount:any,note:string}>;
  constructor(){this.items=[];this.newItem='';}

  //Add a new Item
  addNewItem(newitem:string){
    if(newitem!=''){
      let item={name:newitem,bought:false,amount:1,note:'N/A'};
      this.items.push(item);
      this.newItem='';
    }
  }

  //check box - bought
  bought(item){
    item.bought=!item.bought;
  }

 delete(item){
    let delIndex=this.items.indexOf(item);
    this.items.splice(delIndex,1);
  }

  swipeLeftEvent($event){
    console.log('swiperight')
  }

}
