import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import firebase from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';

/**
 * Generated class for the CriarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-criar',
  templateUrl: 'criar.html',
})
export class CriarPage {

  categoriaEmpresarial: any[] = new Array();
  formGroup: FormGroup;
  firestore = firebase.firestore();
  imagem: any;

  settings = { timestampsInSnapshots: true };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseauth: AngularFireAuth,
    public storage: AngularFireStorage,
    public formBuilder: FormBuilder) {

    this.firestore.settings(this.settings);

    this.formGroup = this.formBuilder.group({
      id: ['', [Validators.required]],
      foto: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      nome: ['', [Validators.required]],
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CriarPage');
  }



  cadastrarP() {
    //cria um id unico

    this.formGroup.controls['id'].setValue(this.firebaseauth.auth.currentUser.uid);

    this.firestore.collection("categoriaEmpresarial").add(
      this.formGroup.value
    ).then(ref => {

      console.log("Cadastrado com sucesso");
      console.log(ref.id);
      this.add(ref.id)
    }).catch(err => {

      console.log(err.message);
    });
  }

  enviaArquivoP(event) {
    // Pega o arquivo 
    this.imagem = event.srcElement.files[0];
  }

  add(id: string) {

    // Diretório + caminho imagem no servidor
    let caminho = firebase.storage().ref().child(`Empresarial/${id}.jpg`);
    // Executa o upload
    caminho.put(this.imagem).then(resp => {
      // Se sucesso, pega a url para download da imagem
      caminho.getDownloadURL().then(url => {
        // adicionar a url da imagem no form
        //this.formGroup.controls['imagem'].setValue(this.msg = url);
        // Cadastra os dados no Firestone
        console.log("imagem enviada")
        this.firestore.collection("categoriaEmpresarial")
          .doc(id).update({ 'foto': url });
      });
    }).catch(err => {
      //Houve algum erro
      console.log(err.message);
    })
  }


}
