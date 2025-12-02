import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionStorageService } from '../services/session-storage.service';

export const authGuard: CanActivateFn = () => {
  const sessionService = inject(SessionStorageService);
  const router = inject(Router);

  if (!sessionService.isSessionActive()) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
