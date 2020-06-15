import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OptionItem } from 'src/app/models/optionItem';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  formLogin: OptionItem[] = [{
      titulo: 'Correo electónico',
      ejemplo: 'username@email.com',
      tipo: 'email',
      contenido: '',
      valido: false
    },
    {
      titulo: 'Contraseña',
      ejemplo: '',
      tipo: 'password',
      contenido: '',
      valido: false
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ingresar() {
    console.log(this.formLogin[0].contenido)
    console.log(this.formLogin[1].contenido)
    if (this.formLogin[0].valido  && this.formLogin[1].valido)
    {
      this.router.navigate(['pots']);
    }
  }

}
