import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
/**
 * Generated class for the ProjetosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-projetos',
  templateUrl: 'projetos.html',
})
export class ProjetosPage {

  categoriaEmpresarial: any[] = new Array(); //categoria no firebase
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getList();
    console.log('ionViewDidLoad ProjetosPage');
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

  detalhe(id : string){
    console.log(id);
    this.navCtrl.push("MensagemDetalhePage",{'id' : id});
  }

  goEmpresarial(){
    this.navCtrl.push('CriarPage');
  }


  goEmp(){
    this.navCtrl.push('CEmpresarialPage');
  }


}
