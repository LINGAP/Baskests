import { Component, OnInit, Input } from '@angular/core';
import { ItemDataService } from '../../services/item-data.service'
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
    @Input('page') page;
    searchText:string;
  constructor(private itemData:ItemDataService) {
  }

  ngOnInit() {}


  //delete selected items
  delete(){
    this.itemData.delete(this.page);
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
