import { Component,   Input, OnInit } from '@angular/core';
import { ItemDataService } from '../../services/item-data.service'
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input('page') page;
  @Input('item') item;
  constructor(private itemData:ItemDataService) { }

  ngOnInit() {}

  async edit(item){
    item.value.editing = true;
  }

  save(item){
    item.value.editing=false;
  }

  //expand detail
  async displayDetail(item){
    this.itemData.displayDetail(item.value);
  }

}
