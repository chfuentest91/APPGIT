import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-mis-datos',
  standalone: true,
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class MisDatosComponent {
  data = {
    nombre: '',
    apellido: '',
    nivelEducacion: '',
    fechaNacimiento: null
  };

  constructor(private alert: AlertController) {}

  async mostrar() {
  
    const mensaje = `Nombre: ${this.data.nombre}\nApellido: ${this.data.apellido}`;

    const alert = await this.alert.create({
      header: 'Datos ingresados',
      message: mensaje,
      buttons: ['OK'],
      cssClass: 'alert-mis-datos'
    });

    await alert.present();
  }

  limpiar() {
    this.data = {
      nombre: '',
      apellido: '',
      nivelEducacion: '',
      fechaNacimiento: null
    };
  }
}
