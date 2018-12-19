import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {
  categoriaEmpresarial: any[] = new Array();
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriasPage');
  }

  goEmpresarial(){
    this.navCtrl.push('CEmpresarialPage');
  }
  getList() {
    var postRef = firebase.firestore()
      .collection("categoriaEmpresarial");

    postRef.get().then(query => {
      query.forEach(doc => {
        this.categoriaEmpresarial.push(doc.data());
      });
    });
  }
}
