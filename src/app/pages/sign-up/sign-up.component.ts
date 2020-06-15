import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  formSignUp = [{
      titulo: 'Nombre',
      ejemplo: 'Rodolfo Gómez',
      tipo: 'text',
      contenido: '',
      valido: false
    },
    {
      titulo: 'Correo electrónico',
      ejemplo: 'rodolfog@email.com',
      tipo: 'email',
      contenido: '',
      valido: false
    },
    {
      titulo: 'Contraseña',
      ejemplo: ' ',
      tipo: 'password',
      contenido: '',
      valido: false
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  async registrar() {
    console.log(this.formSignUp[0].contenido)
    console.log(this.formSignUp[1].contenido)
    console.log(this.formSignUp[2].contenido)
    if (this.formSignUp[0].valido  && this.formSignUp[1].valido && this.formSignUp[2].valido)
    {
      await Swal.fire({
        icon: 'success',
        title: 'Registro exitoso!',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['pots']);
    }
  }

}
