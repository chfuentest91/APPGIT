import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-camera',
  standalone: true,
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
  imports: [IonicModule, CommonModule],
})
export class CameraPage {

  fotoDataUrl?: string;

  constructor(private alertCtrl: AlertController) {}

  async tomarFoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 80,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });

      this.fotoDataUrl = image.dataUrl ?? undefined;
    } catch (e) {
      console.error(e);
      this.mostrarAlerta('No se pudo tomar la foto');
    }
  }

  private async mostrarAlerta(msg: string) {
    const alert = await this.alertCtrl.create({
      header: 'Cámara',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }
}
