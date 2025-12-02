import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiExternalService, PostExternal } from '../services/api-external.service';

@Component({
  selector: 'app-api-external',
  standalone: true,
  templateUrl: './api-external.page.html',
  styleUrls: ['./api-external.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ApiExternalPage implements OnInit {

  posts: PostExternal[] = [];
  form: PostExternal = { title: '', body: '' };

  constructor(private api: ApiExternalService) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.api.getAll().subscribe({
      next: data => this.posts = data.slice(0, 10), // primeros 10
      error: err => console.error('Error GET externa:', err)
    });
  }

  seleccionar(p: PostExternal) {
    this.form = { ...p };
  }

  limpiar() {
    this.form = { title: '', body: '' };
  }

  guardar() {
    if (!this.form.title || !this.form.body) {
      return;
    }

    if (this.form.id) {
      this.api.update(this.form.id, this.form).subscribe({
        next: () => { this.cargar(); this.limpiar(); },
        error: err => console.error('Error PUT externa:', err)
      });
    } else {
      this.api.create(this.form).subscribe({
        next: () => { this.cargar(); this.limpiar(); },
        error: err => console.error('Error POST externa:', err)
      });
    }
  }

  eliminar(p: PostExternal) {
    if (!p.id) { return; }
    this.api.delete(p.id).subscribe({
      next: () => this.cargar(),
      error: err => console.error('Error DELETE externa:', err)
    });
  }
}
