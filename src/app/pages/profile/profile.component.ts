import { Component, OnInit } from '@angular/core';
import { OptionItem } from 'src/app/models/optionItem';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  formEdit: OptionItem[] = [{
    titulo: 'Nuevo nombre',
    ejemplo: 'user.nombre',
    tipo: 'text',
    contenido: '',
    valido: false
  },
  {
    titulo: 'Nuevo correo electrónico',
    ejemplo: 'user.email',
    tipo: 'email',
    contenido: '',
    valido: false
  },
  {
    titulo: 'Nueva contraseña',
    ejemplo: ' ',
    tipo: 'password',
    contenido: '',
    valido: false
  }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  guardar() {
    console.log(this.formEdit[0].contenido)
    console.log(this.formEdit[1].contenido)
    console.log(this.formEdit[2].contenido)
  }

}
