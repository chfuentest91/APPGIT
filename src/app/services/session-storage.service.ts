import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionStorageService {

  private readonly KEY = 'usuario_activo'; 

  constructor() {}

  // Guardar sesión
  setSession(user: string): void {
    sessionStorage.setItem(this.KEY, user);
  }

  // Eliminar sesión
  clearSession(): void {
    sessionStorage.removeItem(this.KEY);
  }

  // Saber si existe sesión activa
  isSessionActive(): boolean {
    return sessionStorage.getItem(this.KEY) !== null;
  }

  // Obtener el usuario guardado
  getUser(): string | null {
    return sessionStorage.getItem(this.KEY);
  }
}
