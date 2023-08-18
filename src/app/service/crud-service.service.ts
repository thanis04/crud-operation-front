import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Userdetail} from "./userdetail";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CrudServiceService {

  REST_API: String = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  GetUsers() {
    return this.httpClient.get(`${this.REST_API}/user/get`)
  }

  AddUser(data: Userdetail): Observable<Userdetail> {
    return this.httpClient
      .post(`${this.REST_API}/user/post`, data)
      .pipe(catchError(this.handleError));
  }

  GetUserByName(name: any):Observable<any> {
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.get(`${this.REST_API}/user/getByName/${name}`, {
      headers: httpHeaders,
      responseType: 'json'
    });
  }

  /*DeleteUser(data: Userdetail): Observable<Userdetail> {
     // return this.httpClient.delete(`${this.REST_API}/user/delete/${name}`);
    return this.httpClient
        .post(`${this.REST_API}/user/deleteUser`, data)
        .pipe(catchError(this.handleError));
  }*/

  DeleteUser(name: any) {
    return this.httpClient.delete(`${this.REST_API}/user/deleteUser/${name}`)
        .subscribe(
            () => {
              console.log(`User ${name} deleted successfully.`);
            },
            (error) => {
              console.error('Error deleting user:', error);
            }
        );
  }

  // @ts-ignore
  loginUser(name: any, password: any):Observable<boolean> {

    const body = { name, password}
    const user: Userdetail = {
      user_name: name,
      password: password
    }

    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post<boolean>(`${this.REST_API}/user/login`, user, {
      headers: httpHeaders,
      responseType: 'json'
    })
  }


  UpdateUser(name: any, data: Userdetail) {
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
    return this.httpClient.put(`${this.REST_API}/user/update/${name}`, data, {
      headers: httpHeaders,
      responseType: 'json'
    })
        .pipe(catchError(this.handleError));
  }

  handleError(err: HttpErrorResponse) {
    if (err.status == 0) {
      console.error('An error occurred: ', err.error);
    }else {
      console.error(
        `Backend returned code ${err.status}, body was: `, err.error);
    }
    return throwError(() => new Error('Something bad happened please try again later.'));
  }
}
