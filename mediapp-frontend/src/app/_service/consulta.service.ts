import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConsultaListaExamenDTO } from '../dto/consultaListaExamenDTO';
import { FiltroConsultaDTO } from '../dto/filtroConsultaDTO';
import { Consulta } from '../_model/consulta';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private url: string = `${environment.HOST}/consultas`;

  constructor(
    private http: HttpClient
  ) { }

  registrarTransaccion(consultaDTO: ConsultaListaExamenDTO) {
    return this.http.post(this.url, consultaDTO);
  }

  buscarFecha(fecha1: string, fecha2: string) {
    return this.http.get<Consulta[]>(`${this.url}/buscar?fecha1=${fecha1}&fecha2=${fecha2}`);
  }

  buscarOtros(filtroConsulta: FiltroConsultaDTO) {
    return this.http.post<Consulta[]>(`${this.url}/buscar/otros`, filtroConsulta);
  }

  listarExamenPorConsulta(idConsulta: number) {
    return this.http.get<ConsultaListaExamenDTO[]>(`${environment.HOST}/consultaexamenes/${idConsulta}`);
    //[{consulta, examen},
	  //{consulta, examen},
	  //{consulta, examen}
   // ]
  }

  listarResumen() {
    return this.http.get<any[]>(`${this.url}/listarResumen`);
  }
}
