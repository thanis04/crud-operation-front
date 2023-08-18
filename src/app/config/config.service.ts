import { Injectable } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private http: String = ``;

  constructor() { }

   handleError(err: HttpErrorResponse) {
    if (err.status == 0) {
      console.error('An error occurred: ', err.error);
    }else {
      console.error(
        `Backend returned code ${err.status}, body was: `, err.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
