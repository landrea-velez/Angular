import { SignosService } from './../../../_service/signos.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable } from 'rxjs';
import { Signos } from 'src/app/_model/signos';
import { Paciente } from 'src/app/_model/paciente';
import { PacienteService } from 'src/app/_service/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment from 'moment';


@Component({
  selector: 'app-signos-edicion',
  templateUrl: './signos-edicion.component.html',
  styleUrls: ['./signos-edicion.component.css']
})
export class SignosEdicionComponent implements OnInit {

  form: FormGroup;
  pacientes: Paciente[];
  temperatura: string;
  pulso: string;
  ritmo: string;
  mensaje: string;

  //utiles para el autocomplete
  myControlPaciente: FormControl = new FormControl();
  pacientesFiltrados$: Observable<Paciente[]>;
  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();
  pacienteSeleccionado: Paciente;

  constructor(
    private signosService: SignosService,
    private pacienteService: PacienteService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'paciente': this.myControlPaciente,    
      'fecha': new FormControl(new Date()),
      'temperatura':  new FormControl(''),
      'pulso':  new FormControl(''),
      'ritmo':  new FormControl('')
  
    });

    this.listarInicial();

    this.pacientesFiltrados$ = this.myControlPaciente.valueChanges.pipe(map(val => this.filtrarPacientes(val)));
  }

  filtrarPacientes(val: any) {
    if (val != null && val.idPaciente > 0) {
      return this.pacientes.filter(el =>
        el.nombres.toLowerCase().includes(val.nombres.toLowerCase()) || el.apellidos.toLowerCase().includes(val.apellidos.toLowerCase()) || el.dni.includes(val.dni)
      );
    }
    return this.pacientes.filter(el =>
      el.nombres.toLowerCase().includes(val?.toLowerCase()) || el.apellidos.toLowerCase().includes(val?.toLowerCase()) || el.dni.includes(val)
    );
  }

  mostrarPaciente(val: any) {
    return val ? `${val.nombres} ${val.apellidos}` : val;
  }

  listarInicial() {
    this.pacienteService.listar().subscribe(data => {
      this.pacientes = data;
    });
  }

  operar() {
    let signos = new Signos();
    signos.paciente = this.form.value['paciente'];
    signos.fecha = moment(this.form.value['fecha']).format('YYYY-MM-DDTHH:mm:ss');
    signos.temperatura = this.form.value['temperatura'];
    signos.pulso = this.form.value['pulso'];
    signos.ritmo = this.form.value['ritmo'];

    this.signosService.registrarTransaccion(signos).subscribe(() => {
      this.snackBar.open("Se registró", "Aviso", { duration: 2000 });

      setTimeout(() => {
        this.limpiarControles();
      }, 2000)

    });
  }

  limpiarControles() {
    this.pacienteSeleccionado = null;   
    this.fechaSeleccionada = new Date();
    this.fechaSeleccionada.setHours(0);
    this.fechaSeleccionada.setMinutes(0);
    this.fechaSeleccionada.setSeconds(0);
    this.fechaSeleccionada.setMilliseconds(0);
    this.mensaje = '';    
    //para autocompletes
    this.myControlPaciente.reset();
    this.router.navigate(['/pages/signos']);
  }
}
