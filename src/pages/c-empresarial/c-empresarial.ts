import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import firebase from 'firebase';
import {AngularFirestore} from 'angularfire2/firestore';
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
    
    categoriaEmpresarial: any[] = new Array();
    formGroup : FormGroup;
    firestore = firebase.firestore();
    imagem : any;

  settings = {timestampsInSnapshots: true};

  

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public alertCtrl: AlertController, 
     public firebaseauth: AngularFireAuth,
     public storage: AngularFireStorage,
     public formBuilder: FormBuilder) {

      this.firestore.settings(this.settings);

      this.formGroup = this.formBuilder.group({
        idCategoria: ['', [Validators.required]],
        imagem: ['', [Validators.required]],
        texto: ['', [Validators.required]],
        titulo: ['', [Validators.required]],

      });
    
  }

  ionViewDidLoad() {
    
    
    console.log('ionViewDidLoad CEmpresarialPage');
  }

  cadastrarF(){
    //cria um id unico
   
    this.formGroup.controls['idCategoria'].setValue(this.firebaseauth.auth.currentUser.uid);

    this.firestore.collection("conteudo").add(
      this.formGroup.value
    ).then(ref => {

      console.log("Cadastrado com sucesso");
      console.log(ref.id);
      this.add(ref.id)
    }).catch(err => {
      
      console.log(err.message);
    });
  }

  enviaArquivoF(event){
    // Pega o arquivo 
    this.imagem = event.srcElement.files[0];
  }

  add(id : string){
   
    // Diretório + caminho imagem no servidor
    let caminho = firebase.storage().ref().child(`Empresarial/${id}.jpg`);
    // Executa o upload
    caminho.put(this.imagem).then(resp => {
      // Se sucesso, pega a url para download da imagem
      caminho.getDownloadURL().then(url=>{
        // adicionar a url da imagem no form
        //this.formGroup.controls['imagem'].setValue(this.msg = url);
        // Cadastra os dados no Firestone
        console.log("imagem enviada")
        this.firestore.collection("conteudo")
          .doc(id).update({'imagem' : url});
      });
    }).catch(err => {
      //Houve algum erro
      console.log(err.message);
    })
  }




}


