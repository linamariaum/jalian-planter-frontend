import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { OptionItem } from 'src/app/models/optionItem';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  formSignUp: OptionItem[] = [{
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

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  async registrar() {
    console.log()
    console.log()
    console.log()
    if (this.formSignUp[0].valido  && this.formSignUp[1].valido && this.formSignUp[2].valido)
    {
      const userRequest : User = {
        email: this.formSignUp[1].contenido,
        name: this.formSignUp[0].contenido,
        password: this.formSignUp[2].contenido
      };

      this.authService.registerUser(userRequest).subscribe(user => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso!',
          showConfirmButton: false,
          timer: 1500
        });

        localStorage.setItem('role', user.role.toString());
        localStorage.setItem('name', user.name);
        localStorage.setItem('id', user.id.toString());
        this.router.navigate(['pots']);
      }, err => {
        console.log(err);
        if (err.status === 0) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error con nuestros servidores 😢'
          })
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Tu correo ya existe en nuestra plataforma!'
          })
        }
      });
    }
  }
}
