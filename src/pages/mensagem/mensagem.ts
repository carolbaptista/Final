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

  mensagens: any[] = new Array();
  formGroup : FormGroup;
  imagem : any;

  firestore = firebase.firestore();
  settings = {timestampsInSnapshots: true};

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public firebaseauth: AngularFireAuth,
    public storage: AngularFireStorage,
    public formBuilder: FormBuilder) {

      this.firestore.settings(this.settings);

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
     
      this.formGroup.controls['id'].setValue(this.firebaseauth.auth.currentUser.uid);

      this.firestore.collection("cadastro").add(
        this.formGroup.value
      ).then(ref => {

        console.log("Cadastrado com sucesso");
        console.log(ref.id);
        this.add(ref.id)
      }).catch(err => {
        
        console.log(err.message);
      });
    }

    enviaArquivo(event){
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
          this.firestore.collection("cadastro")
            .doc(id).update({'foto' : url});
        });
      }).catch(err => {
        //Houve algum erro
        console.log(err.message);
      })
    }
}
