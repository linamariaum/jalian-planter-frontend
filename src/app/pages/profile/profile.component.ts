import { Component, OnInit } from '@angular/core';
import { OptionItem } from 'src/app/models/optionItem';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  formEdit: OptionItem[] = [{
    titulo: 'Nuevo nombre',
    ejemplo: localStorage.getItem('name'),
    tipo: 'text',
    contenido: '',
    valido: false
  },
  {
    titulo: 'Nuevo correo electrónico',
    ejemplo: 'correo@email.com',
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
  params: Subscription;
  user: User = {
    id: 0,
    name: '',
    email: ''
  }

  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.params = this.route.params.subscribe(params => {
      const userId = params['id'];

      if (userId) {
        this.authService.getUserById(userId).subscribe(data => {
          this.user = data;
          this.formEdit[1].ejemplo = this.user.email;
        });
      }
    })
  }

  guardar() {
    
    this.user.name = this.formEdit[0].contenido ? this.formEdit[0].contenido: this.user.name;
    this.user.email = this.formEdit[1].contenido ? this.formEdit[1].contenido: this.user.email;
    this.user.password = this.formEdit[2].contenido ? this.formEdit[2].contenido: this.user.password;

    this.authService.updateUserById(this.user.id, this.user).subscribe(data => {
      this.user = data;
      Swal.fire({
        icon: 'success',
        title: 'Genial',
        text: 'Se han guardado tus cambios',
      });
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ha ocurrido un error con nuestros servidores 😢',
      });
    });
  }

}
