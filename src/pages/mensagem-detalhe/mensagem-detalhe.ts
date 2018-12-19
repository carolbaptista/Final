import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

/**
 * Generated class for the MensagemDetalhePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mensagem-detalhe',
  templateUrl: 'mensagem-detalhe.html',
})
export class MensagemDetalhePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MensagemDetalhePage');
  }


  excluir(){
    firebase.firestore().collection("mensagem").doc(this.navParams.get('id'))
      .delete().then(()=> {
        this.navCtrl.setRoot("MensagemPage");
    }).catch(error => {
        console.error("Error ao remover document: ", error.message);
    });
  }
}
