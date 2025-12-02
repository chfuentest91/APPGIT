import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // LOGIN
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.page').then((m) => m.LoginPage),
  },

  // HOME (PROTEGIDA)
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./home/home.page').then((m) => m.HomePage),
  },

  // API LOCAL - json-server
  {
    path: 'api-local',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./api-local/api-local.page').then((m) => m.ApiLocalPage),
  },

  // API EXTERNA - JSONPlaceholder
  {
    path: 'api-external',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./api-external/api-external.page').then((m) => m.ApiExternalPage),
  },

  // MAPA + GEOLOCALIZACIÓN
  {
    path: 'mapa',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./mapa/mapa.page').then((m) => m.MapaPage),
  },

  // CÁMARA
  {
    path: 'camera',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./camera/camera.page').then((m) => m.CameraPage),
  },

  // 404
  {
    path: '404',
    loadComponent: () =>
      import('./not-found/not-found.page').then((m) => m.NotFoundPage),
  },

  // RUTA INVALIDA → 404
  {
    path: '**',
    redirectTo: '404',
  }
];
