import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import {AngularFirestore} from 'angularfire2/firestore';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';

/**
 * Generated class for the MensagemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mensagem',
  templateUrl: 'mensagem.html',
})
export class MensagemPage {

  formGroup : FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public firestore: AngularFirestore,
    public firebaseauth: AngularFireAuth,
    public storage: AngularFireStorage,
    public formBuilder: FormBuilder) {

      this.formGroup = this.formBuilder.group({
        id: ['', [Validators.required]],
        nome: ['', [Validators.required]],
        usuario: ['', [Validators.required]],
        email: ['', [Validators.required]],
        senha: ['', [Validators.required]],
        

      });
  }

  ionViewDidLoad() {
  }

    cadastrar(){
      //cria um id unico
      let id = this.firestore.createId();
      this.formGroup.controls['id'].setValue(
        this.firebaseauth.auth.currentUser.uid);
    }
}
