import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

export interface PostExternal {
  id?: number;
  userId?: number;
  title: string;
  body: string;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({ providedIn: 'root' })
export class ApiExternalService {

  private baseUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  // CREATE
  create(post: PostExternal): Observable<PostExternal> {
    return this.http
      .post<PostExternal>(this.baseUrl, post, httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // READ (todos)
  getAll(): Observable<PostExternal[]> {
    return this.http
      .get<PostExternal[]>(this.baseUrl)
      .pipe(retry(1), catchError(this.handleError));
  }

  // READ (uno)
  getById(id: number): Observable<PostExternal> {
    return this.http
      .get<PostExternal>(`${this.baseUrl}/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  // UPDATE
  update(id: number, post: PostExternal): Observable<PostExternal> {
    return this.http
      .put<PostExternal>(`${this.baseUrl}/${id}`, post, httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // DELETE
  delete(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

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
