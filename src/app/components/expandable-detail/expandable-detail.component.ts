import { Component, OnInit, Inject, Input} from '@angular/core';
import { ItemDataService } from '../../services/item-data.service'

@Component({
  selector: 'app-expandable-detail',
  templateUrl: './expandable-detail.component.html',
  styleUrls: ['./expandable-detail.component.scss'],
})
export class ExpandableDetailComponent implements OnInit {
  newTag:string;
  tags:Array<string>;
  dateEditing:boolean;
  @Input('expandItem') item;
  @Input('curPage')curPage;
  currentHeight:number=0;
  constructor(private itemData:ItemDataService) {
  }

  ngOnInit() {this.newTag='';
  var inputField=document.querySelector("ion-input");
  inputField.setFocus();}

  addTag(){
    if(this.newTag.trim()!=''){
      this.itemData.updateItem(this.item.key,null,null,this.newTag);
      this.newTag='';
    }
  }

  deleteTag(tag){
    this.itemData.updateItem(this.item.key,null,null,null,tag);
  }

  //modify this to pass in datepicker value
  changeDate(newDate){
    this.itemData.updateItem(this.item.key,null,newDate);
  }
}
