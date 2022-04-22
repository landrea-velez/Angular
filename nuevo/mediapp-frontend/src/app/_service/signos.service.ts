import { Signos } from 'src/app/_model/signos';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignosService {

  private url: string = `${environment.HOST}/signos`;

  constructor(
    private http: HttpClient
  ) { }

  registrarTransaccion(signos: Signos) {
    return this.http.post(this.url, signos);
  }

}
