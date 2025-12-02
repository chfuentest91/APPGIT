import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { ApiLocalService, UsuarioLocal } from '../services/api-local.service';

@Component({
  selector: 'app-api-local',
  standalone: true,
  templateUrl: './api-local.page.html',
  styleUrls: ['./api-local.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ApiLocalPage implements OnInit {

  usuarios: UsuarioLocal[] = [];
  form: UsuarioLocal = { nombre: '', apellido: '' };

  constructor(
    private apiLocal: ApiLocalService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.apiLocal.getAll().subscribe({
      next: data => this.usuarios = data,
      error: err => console.error('Error GET all:', err)
    });
  }

  seleccionar(u: UsuarioLocal) {
    this.form = { ...u }; 
  }

  limpiar() {
    this.form = { nombre: '', apellido: '' };
  }

  guardar() {
    if (!this.form.nombre || !this.form.apellido) {
      this.mostrarAlerta('Debes completar nombre y apellido');
      return;
    }

   
    if (this.form.id) {
      this.apiLocal.update(this.form.id, this.form).subscribe({
        next: () => { this.cargar(); this.limpiar(); },
        error: err => console.error('Error PUT:', err)
      });
    } else {
     
      this.apiLocal.create(this.form).subscribe({
        next: () => { this.cargar(); this.limpiar(); },
        error: err => console.error('Error POST:', err)
      });
    }
  }

  eliminar(u: UsuarioLocal) {
    if (!u.id) { return; }
    this.apiLocal.delete(u.id).subscribe({
      next: () => this.cargar(),
      error: err => console.error('Error DELETE:', err)
    });
  }

  private async mostrarAlerta(msg: string) {
    const alert = await this.alertCtrl.create({
      header: 'Mensaje',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }
}
