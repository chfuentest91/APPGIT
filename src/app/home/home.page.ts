import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';


import { RouterModule } from '@angular/router';


import { MisDatosComponent } from './mis-datos/mis-datos.component';
import { ExperienciaLaboralComponent } from './experiencia-laboral/experiencia-laboral.component';
import { CertificacionesComponent } from './certificaciones/certificaciones.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule,               
    MisDatosComponent,
    ExperienciaLaboralComponent,
    CertificacionesComponent
  ],
  animations: [
    trigger('tituloAnimado', [
      state('activo', style({ transform: 'scale(1)', opacity: 1 })),
      transition('void => activo', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate('400ms ease-out')
      ])
    ]),
    trigger('inputAnim', [
      state('quieto', style({ transform: 'translateX(0)' })),
      state('mover', style({ transform: 'translateX(0)' })),
      transition('quieto => mover', [
        style({ transform: 'translateX(-30px)' }),
        animate('1s ease-out')
      ])
    ])
  ]
})
export class HomePage {

  usuarioRecibido: string = '';
  animarInputs = false;
  segment: 'datos' | 'experiencia' | 'certificaciones' = 'datos';

  data = {
    nombre: '',
    apellido: '',
    nivelEducacion: '',
    fechaNacimiento: null as Date | null
  };

  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {
    this.route.queryParams.subscribe(params => {
      this.usuarioRecibido = params['usuario'] || '';
    });
  }

  async mostrar() {
    const mensaje = `Nombre: ${this.data.nombre}\nApellido: ${this.data.apellido}`;
    const alert = await this.alertController.create({
      header: 'Datos ingresados',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  limpiar() {
    this.data.nombre = '';
    this.data.apellido = '';
    this.data.nivelEducacion = '';
    this.data.fechaNacimiento = null;

    this.animarInputs = false;
    setTimeout(() => {
      this.animarInputs = true;
    }, 10);
  }
}
