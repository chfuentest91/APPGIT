import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Geolocation, Position } from '@capacitor/geolocation';

@Component({
  selector: 'app-mapa',
  standalone: true,
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
  imports: [IonicModule, CommonModule],
})
export class MapaPage implements OnDestroy {

  lat?: number;
  lng?: number;
  accuracy?: number;
  mapUrl?: SafeResourceUrl;
  watchId: string | null = null;

  constructor(
    private sanitizer: DomSanitizer,
    private alertCtrl: AlertController
  ) {
    this.iniciar();
  }

  async iniciar() {
    try {
      await Geolocation.requestPermissions();

      const pos = await Geolocation.getCurrentPosition();
      this.actualizarCoords(pos);

      this.watchId = await Geolocation.watchPosition({}, (position, err) => {
        if (err) {
          console.error('Error watchPosition:', err);
          return;
        }
        if (position) {
          this.actualizarCoords(position);
        }
      });
    } catch (e) {
      console.error(e);
      this.mostrarAlerta('No se pudo obtener la ubicación');
    }
  }

  ngOnDestroy(): void {
    this.detenerWatch();
  }

  async detenerWatch() {
    if (this.watchId) {
      await Geolocation.clearWatch({ id: this.watchId });
      this.watchId = null;
    }
  }

  private actualizarCoords(pos: Position) {
    this.lat = pos.coords.latitude;
    this.lng = pos.coords.longitude;
    this.accuracy = pos.coords.accuracy;

    const url = `https://www.google.com/maps?q=${this.lat},${this.lng}&z=16&output=embed`;
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  private async mostrarAlerta(msg: string) {
    const alert = await this.alertCtrl.create({
      header: 'Ubicación',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }
}
