import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-help-popup',
  templateUrl: './help-popup.component.html',
  styleUrls: ['./help-popup.component.scss'],
})

export class HelpPopupComponent implements OnInit {

  constructor(public modalController:ModalController) { }

  ngOnInit() {}

  closeHelpPopup(){
    this.modalController.dismiss();
  }

}
