import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OptionItem } from 'src/app/models/optionItem';
import { Login } from 'src/app/models/request/login';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

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

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  ingresar() {
    if (this.formLogin[0].valido  && this.formLogin[1].valido)
    {
      const loginRequest: Login = {
        email: this.formLogin[0].contenido,
        password: this.formLogin[1].contenido
      }

      this.authService.login(loginRequest).subscribe(user => {
        localStorage.setItem('role', user.role.toString());
        localStorage.setItem('name', user.name);
        localStorage.setItem('id', user.id.toString());
        //this.router.navigate(['pots']);
        this.router.navigateByUrl('/pots');
        // Guardar info en local storge
      }, err => {
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
            text: 'Parece que tus credenciales no coinciden!'
          })
        }
      })
      
    }
  }

}
