import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DBTaskService } from '../../services/dbtask.service';

@Component({
  selector: 'app-certificaciones',
  standalone: true,
  templateUrl: './certificaciones.component.html',
  styleUrls: ['./certificaciones.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CertificacionesComponent {

  nombre = '';
  institucion = '';
  anio: number | null = null;
  lista: any[] = [];

  constructor(private db: DBTaskService) {
    this.cargar();
  }

  async agregar() {
    if (!this.nombre || !this.institucion || this.anio == null) {
      return;
    }

    await this.db.addCertificacion(this.nombre, this.institucion, this.anio);
    this.nombre = '';
    this.institucion = '';
    this.anio = null;

    await this.cargar();
  }

  async cargar() {
    this.lista = await this.db.getCertificaciones();
  }

  async eliminar(id: number) {
    await this.db.deleteCertificacion(id);
    await this.cargar();
  }
}
