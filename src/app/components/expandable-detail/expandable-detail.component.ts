import { Component, OnInit, Inject, Input} from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController} from '@ionic/angular';

@Component({
  selector: 'app-expandable-detail',
  templateUrl: './expandable-detail.component.html',
  styleUrls: ['./expandable-detail.component.scss'],
})
export class ExpandableDetailComponent implements OnInit {
//  @Input('item') item:any;
  amount:number;
  tags:Array<string>;
  @Input('expanded') expanded;
  @Input('expandHeight') expandHeight;
  currentHeight:number=0;
  constructor() {

  }

  ngOnInit() {
    console.log(this.expanded);
    console.log(this.expandHeight);

  }

}
