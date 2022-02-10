import { Paciente } from './../../_model/paciente';
import { PacienteService } from './../../_service/paciente.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  pacientes: Paciente[];

  constructor(
    private pacienteService: PacienteService
  ) { }

  ngOnInit(): void {
    this.pacienteService.listar().subscribe(data => {
      this.pacientes = data;
    });
  }

}
