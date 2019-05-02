import { Component,   Input, OnInit } from '@angular/core';
import { ItemDataService } from '../../services/item-data.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input('page') page;
  @Input('item') item;
  newName:string;
  constructor(private itemData:ItemDataService,public alertController: AlertController) { }

  ngOnInit() {}

  async edit(item){
    this.newName=item.value.name;
    item.value.editing = true;
  }

  async save(item){
    let existed=this.itemData.__grabExist(this.newName);
    if( (existed !=null) && (existed != item.key)){
      const alert = await this.alertController.create({
       header: 'Warning!',
       message: this.newName+' already exists!',
       buttons: [{
           text: 'Okay',
           cssClass: 'secondary',
         }
       ]
     });
     await alert.present();
     this.newName=item.value.name;
   }
   if( this.newName == ''){
     const alert = await this.alertController.create({
      header: 'Warning!',
      message: 'Name cannot be empty!',
      buttons: [{
          text: 'Okay',
          cssClass: 'secondary',
        }
      ]
    });
    await alert.present();
   }
    else{
      this.itemData.updateItem(item.key,this.newName);
    }
      item.value.editing=false;
  }

  //expand detail
  async displayDetail(item){
    this.itemData.displayDetail(item.value);
  }

  arrow(){
    let name = this.item.value.expanding? "arrow-dropup":"arrow-dropdown";
    return name;
  }

}
