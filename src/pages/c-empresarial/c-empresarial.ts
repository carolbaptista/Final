import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the CEmpresarialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-c-empresarial',
  templateUrl: 'c-empresarial.html',
})
export class CEmpresarialPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CEmpresarialPage');
  }

  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Adicionar funcionário',
      message: "Aqui você digita o nome do funcionário, caminho da foto e descrição",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
        {
          name: 'title',
          placeholder: 'Title'
        },
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancelou');
          }
        },
        {
          text: 'Salvar',
          handler: data => {
            console.log('Salvou');
          }
        }
      ]
    });
    prompt.present();
  }
}

