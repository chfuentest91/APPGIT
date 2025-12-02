import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

export interface UsuarioLocal {
  id?: number;
  nombre: string;
  apellido: string;
}

// Cabeceras HTTP
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({ providedIn: 'root' })
export class ApiLocalService {

  // URL base de la API json-server
  private baseUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) {}

  // CREATE
  create(usuario: UsuarioLocal): Observable<UsuarioLocal> {
    return this.http
      .post<UsuarioLocal>(this.baseUrl, usuario, httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // READ todos
  getAll(): Observable<UsuarioLocal[]> {
    return this.http
      .get<UsuarioLocal[]>(this.baseUrl)
      .pipe(retry(1), catchError(this.handleError));
  }

  // READ uno por id
  getById(id: number): Observable<UsuarioLocal> {
    return this.http
      .get<UsuarioLocal>(`${this.baseUrl}/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  // UPDATE
  update(id: number, usuario: UsuarioLocal): Observable<UsuarioLocal> {
    return this.http
      .put<UsuarioLocal>(`${this.baseUrl}/${id}`, usuario, httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // DELETE
  delete(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Manejo estándar de errores
  private handleError(error: HttpErrorResponse) {
    let msg = '';

    if (error.error instanceof ErrorEvent) {
      msg = `Error de red: ${error.error.message}`;
    } else {
      msg = `Error servidor (${error.status}): ${error.message}`;
    }

    console.error(msg);
    return throwError(() => new Error(msg));
  }
}
