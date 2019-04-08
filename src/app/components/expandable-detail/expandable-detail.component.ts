import { Component, OnInit, Inject, Input} from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ItemDataService } from '../../services/item-data.service'

@Component({
  selector: 'app-expandable-detail',
  templateUrl: './expandable-detail.component.html',
  styleUrls: ['./expandable-detail.component.scss'],
})
export class ExpandableDetailComponent implements OnInit {
  newDate:string;
  newTag:string;
  tags:Array<string>;
  dateEditing:boolean;
  @Input('expandItem') item;
  @Input('curPage')curPage;
  currentHeight:number=0;
  constructor(private itemData:ItemDataService) {
  }

  ngOnInit() {this.newDate='';this.newTag='';}

  addTag(){
    if(this.newTag.trim()!=''){
      this.itemData.addTag(this.item.key,this.newTag.trim());
      this.newTag='';
    }
  }

  deleteTag(tag){
    this.itemData.deleteTag(this.item.key,tag);
  }

  changeDate(newDate){
    this.itemData.changeDate(this.item.key,newDate);
  }
}
