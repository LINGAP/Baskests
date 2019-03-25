import { Component, OnInit, Input } from '@angular/core';
import { ModalController} from '@ionic/angular';
@Component({
  selector: 'app-input-detail',
  templateUrl: './input-detail.component.html',
  styleUrls: ['./input-detail.component.scss'],
})
export class InputDetailComponent implements OnInit {
  @Input('itemName')itemName:string;
  newTag:string;
  tags:Array<any>;
  date:string='--/--/';
  constructor(public modalController:ModalController) {this.tags=[]; }

  ngOnInit() {}

  dismiss(){
    this.modalController.dismiss({},'cancel');
  }

  save(){
    this.modalController.dismiss({tagArray:this.tags,date:this.date},'save');
  }

  addNewTag(){
    this.tags.push(this.newTag.trim());
    this.newTag='';
  }

  deleteTag(tag){
    var index=this.tags.indexOf(tag);
    this.tags.splice(index,1);
  }
}
