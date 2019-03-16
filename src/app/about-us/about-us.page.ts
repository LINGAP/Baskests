import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {
  ngOnInit() {
  }

  newItem:any;
  historyItems:{[name:string]:{bought:boolean,date:string,selected:boolean,expanding:boolean,tags:Array<String>}}

  example:any={
    name:'example',bought:false,amount:2,note:'dont forgot',selected:false, expanding:false,tags:['weekly','Lorde']
  };
  detailExpandHeight:number=200;

  constructor(public modalController:ModalController){
    this.historyItems={};
    this.newItem='';
  }

  //Add a new Item
  addNewItem(newitem:string){
    if(newitem.trim().length!=0){
      let item={bought:false,date:'--/--/--',selected:false,expanding:false,tags:[]};
      this.historyItems[newitem.trim()]=item;
    }
    this.newItem='';
  }

  //when checkbox was selected
  select(item){
    item['value']['selected']=!item['value']['selected'];
  }

 //delete selected historyItems
 delete(){
   for(var i in this.historyItems){
     if(this.historyItems[i].selected){
       delete this.historyItems[i];
     }
   }
  }

  //moveToHistory
  moveToHistory(){

  }

//expand detail
async displayDetail(item){
  item.value.expanding=!item.value.expanding;
}
  swipeLeftEvent(){
    console.log('swiperight');
  }

}
