import { Signos } from 'src/app/_model/signos';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignosService extends GenericService<Signos> {

  private signosCambio: Subject<Signos[]> = new Subject<Signos[]>();
  private mensajeCambio: Subject<string> = new Subject<string>();  

  constructor(protected override http: HttpClient) {
    super(
      http,
      `${environment.HOST}/signos`);
  }
 
  listarPageable(p: number, s:number){
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  registrarTransaccion(signos: Signos) {
    return this.http.post(this.url, signos);
  }


  //////get & set ////
  getSignosCambio(){
    return this.signosCambio.asObservable();
  }

  setSignosCambio(signos: Signos[]){
    this.signosCambio.next(signos);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string){
    this.mensajeCambio.next(mensaje);
  }

}
