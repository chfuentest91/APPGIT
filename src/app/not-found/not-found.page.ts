import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
  imports: [IonicModule, CommonModule],
})
export class NotFoundPage {
  constructor(private router: Router) {}

  volverHome() {
    this.router.navigate(['/home']);
  }
}
