import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paciente } from '../_model/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  pacienteCambio: Subject<Paciente[]> = new Subject<Paciente[]>();
  mensajeCambio: Subject<string> = new Subject<string>();
  
  private url: string = `${environment.HOST}/pacientes`;  

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Paciente[]>(this.url);
  }

  listarPorId(id: number){
    return this.http.get<Paciente>(`${this.url}/${id}`);
  }

  registrar(paciente : Paciente){
    return this.http.post(this.url, paciente);
  }

  modificar(paciente : Paciente){
    return this.http.put(this.url, paciente);
  }

  eliminar(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

}
