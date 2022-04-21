import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { MenuService } from 'src/app/_service/menu.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: string;
  rol: string = "";

  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    const helper = new JwtHelperService();

    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    const decodedToken = helper.decodeToken(token);
    console.log(decodedToken);
    this.usuario = decodedToken.user_name;
    for (let i = 0; i < decodedToken.authorities.length; i++) {
      this.rol = this.rol + " " +decodedToken.authorities[i] ;      
    }
  }

}
