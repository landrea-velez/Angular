import { Paciente } from './../_model/paciente';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private url: string = `${environment.HOST}/pacientes`;

  constructor(private http:HttpClient) { }

  listar(){
    return this.http.get<Paciente[]>(this.url);
  }
}
