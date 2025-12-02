import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';


import { SessionStorageService } from '../services/session-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class LoginPage {

  user = {
    usuario: '',
    password: ''
  };

  constructor(
    private alertController: AlertController,
    private router: Router,
    private sessionStorage: SessionStorageService
  ) { }


  async agregar() {

    if (!/^[a-zA-Z0-9]{3,8}$/.test(this.user.usuario)) {
      await this.mostrarError(
        'El usuario debe ser alfanumérico y tener entre 3 y 8 caracteres.'
      );
      return;
    }


    if (!/^[0-9]{4}$/.test(this.user.password)) {
      await this.mostrarError(
        'La contraseña debe tener exactamente 4 números.'
      );
      return;
    }


    this.sessionStorage.setSession(this.user.usuario);

    
    const extras: NavigationExtras = {
      queryParams: {
        usuario: this.user.usuario
      }
    };

    this.router.navigate(['/home'], extras);
  }

  private async mostrarError(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}
