import { Component,  Input, OnInit , ViewChild, Renderer,  ElementRef} from '@angular/core';
import { ItemDataService } from '../../services/item-data.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @ViewChild('input') myInput ;
  @Input('page') page;
  @Input('item') item;
  newName:string;
  constructor(private itemData:ItemDataService,public alertController: AlertController, private renderer: Renderer, private elementRef: ElementRef) { }

  ngOnInit() {
  }

  async edit(item){
    this.newName=item.name;
    item.editing = true;

        setTimeout(() => { //https://forum.ionicframework.com/t/focusing-on-form-input-on-ionic-v4/142701/5
       this.myInput.setFocus();
    }, 100);

  }

  async save(){
    let existed=this.itemData.__grabExist(this.newName);

    if( (existed !=null) && (this.itemData.shoppingList[existed] != this.item)){
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
     this.newName=this.item.name;
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
      this.itemData.updateItem(this.item,this.newName);
    }
      this.item.editing=false;
  }

  //expand detail
  async displayDetail(item){
    this.itemData.displayDetail(item);
  }

  arrow(){
    let name = this.item.expanding? "arrow-dropup":"arrow-dropdown";
    return name;
  }

}
