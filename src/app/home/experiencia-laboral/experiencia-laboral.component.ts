import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DBTaskService } from '../../services/dbtask.service';

@Component({
  selector: 'app-experiencia-laboral',
  standalone: true,
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ExperienciaLaboralComponent {

  cargo = '';
  empresa = '';
  anios: number | null = null;
  lista: any[] = [];

  constructor(private db: DBTaskService) {
    this.cargar();
  }

  async agregar() {
    if (!this.cargo || !this.empresa || this.anios == null) {
      return;
    }

    await this.db.addExperiencia(this.cargo, this.empresa, this.anios);
    this.cargo = '';
    this.empresa = '';
    this.anios = null;

    await this.cargar();
  }

  async cargar() {
    this.lista = await this.db.getExperiencias();
  }

  async eliminar(id: number) {
    await this.db.deleteExperiencia(id);
    await this.cargar();
  }
}
