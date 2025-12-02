import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class DBTaskService {
  private db: SQLiteObject | null = null;
  private isNative = false;

 
  private experienciasMem: any[] = [];
  private certificacionesMem: any[] = [];

  constructor(
    private sqlite: SQLite,
    private platform: Platform
  ) {
    
    this.platform.ready().then(() => {
      this.isNative = this.platform.is('cordova') || this.platform.is('capacitor') || this.platform.is('hybrid');
    });
  }

  

  private async getDB(): Promise<SQLiteObject> {
    if (!this.db) {
      this.db = await this.sqlite.create({
        name: 'skeletonapp.db',
        location: 'default',
      });
      await this.createTables();
    }
    return this.db;
  }

  private async execute(sql: string, params: any[] = []): Promise<any> {
    const db = await this.getDB();
    return db.executeSql(sql, params);
  }

  private async createTables(): Promise<void> {

    await this.execute(`
      CREATE TABLE IF NOT EXISTS experiencia (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cargo TEXT,
        empresa TEXT,
        anios INTEGER
      )
    `);

 
    await this.execute(`
      CREATE TABLE IF NOT EXISTS certificaciones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        institucion TEXT,
        anio INTEGER
      )
    `);
  }



  async addExperiencia(cargo: string, empresa: string, anios: number) {
    if (!this.isNative) {

      const id = Date.now();
      this.experienciasMem.push({ id, cargo, empresa, anios });
      return;
    }

    await this.execute(
      'INSERT INTO experiencia (cargo, empresa, anios) VALUES (?, ?, ?)',
      [cargo, empresa, anios]
    );
  }

  async getExperiencias() {
    if (!this.isNative) {

      return [...this.experienciasMem];
    }

    const rs = await this.execute('SELECT * FROM experiencia', []);
    const lista: any[] = [];
    for (let i = 0; i < rs.rows.length; i++) {
      lista.push(rs.rows.item(i));
    }
    return lista;
  }

  async deleteExperiencia(id: number) {
    if (!this.isNative) {

      this.experienciasMem = this.experienciasMem.filter(e => e.id !== id);
      return;
    }

    await this.execute('DELETE FROM experiencia WHERE id = ?', [id]);
  }


  async addCertificacion(nombre: string, institucion: string, anio: number) {
    if (!this.isNative) {
      const id = Date.now();
      this.certificacionesMem.push({ id, nombre, institucion, anio });
      return;
    }

    await this.execute(
      'INSERT INTO certificaciones (nombre, institucion, anio) VALUES (?, ?, ?)',
      [nombre, institucion, anio]
    );
  }

  async getCertificaciones() {
    if (!this.isNative) {
      return [...this.certificacionesMem];
    }

    const rs = await this.execute('SELECT * FROM certificaciones', []);
    const lista: any[] = [];
    for (let i = 0; i < rs.rows.length; i++) {
      lista.push(rs.rows.item(i));
    }
    return lista;
  }

  async deleteCertificacion(id: number) {
    if (!this.isNative) {
      this.certificacionesMem = this.certificacionesMem.filter(c => c.id !== id);
      return;
    }

    await this.execute('DELETE FROM certificaciones WHERE id = ?', [id]);
  }
}
