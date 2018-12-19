import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MensagemDetalhePage } from './mensagem-detalhe';

@NgModule({
  declarations: [
    MensagemDetalhePage,
  ],
  imports: [
    IonicPageModule.forChild(MensagemDetalhePage),
  ],
})
export class MensagemDetalhePageModule {}
