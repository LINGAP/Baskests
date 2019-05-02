import { Component, OnInit, Input } from '@angular/core';
import { ItemDataService } from '../../services/item-data.service'

@Component({
  selector: 'app-add-bar',
  templateUrl: './add-bar.component.html',
  styleUrls: ['./add-bar.component.scss'],
})
export class AddBarComponent implements OnInit {
  @Input('page') page;
  newItem:any;
  focus:boolean;
  constructor(private itemData:ItemDataService) {
    this.newItem='';
    this.focus=false;
  }

  ngOnInit() {}

  focused(){
    this.focus=!this.focus;
    console.log(this.focus)
  }

  addNewItem(){
    this.itemData.addNewItem(this.page,this.newItem);
    this.newItem='';
  }

}
