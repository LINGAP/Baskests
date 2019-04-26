import { Component, OnInit, Input } from '@angular/core';
import { ItemDataService } from '../../services/item-data.service'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
    @Input('page') page;
    searchText:string;
  constructor(private itemData:ItemDataService, public alertController: AlertController) {
  }

  ngOnInit() {}


  //delete selected items
  async delete(){
    const alert = await this.alertController.create({
     header: 'Confirm!',
     message: 'Delete the selected items?',
     buttons: [{
         text: 'Confirm',
         role:'confirm',
         cssClass: 'secondary',
         handler: () => {
           this.itemData.delete(this.page);
         }
       },
       {
         text: 'Cancel',
         role: 'cancel',
         cssClass: 'secondary',
       }
     ]
   });
   await alert.present();

   }


   move(){
     this.itemData.massMoveItem(this.page);
   }

   searchTag(){
      this.itemData.searchTag(this.page,this.searchText.trim());
   }

   undo(){
     this.itemData.__undo();
   }

   buttonIcon(){
     var url= this.page==0? '../../assets/icon/Pantry Icon.svg':'../../assets/icon/Shopping List Icon.svg';
     return url;
   }
}
