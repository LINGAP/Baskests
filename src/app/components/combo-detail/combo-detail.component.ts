import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
@Component({
  selector: 'app-combo-detail',
  templateUrl: './combo-detail.component.html',
  styleUrls: ['./combo-detail.component.scss'],
})
export class ComboDetailComponent implements OnInit {
  dishName:any;
  materials:Array<{name:string}>;
  constructor(public modalController:ModalController) {
    this.materials=[{name:''}];
  }

  ngOnInit() {}

  dismiss(){
    this.modalController.dismiss({},'cancel');
  }

  save(){
    this.modalController.dismiss({materials:this.materials.slice(0,this.materials.length)},'save');
  }

  delete(item){
    let i = this.materials.indexOf(item);
    this.materials.splice(i,1);
  }


  saveMaterial(){
    if(this.materials[this.materials.length-1].name.trim()!=''){
      this.materials.push({name:''});
    }
  }

  trackByName(index:number){
    return index;
  }


}
