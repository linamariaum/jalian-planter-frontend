import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Pot } from 'src/app/models/pot';
import { PotServiceService } from 'src/app/services/pot-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-pots',
  templateUrl: './list-pots.component.html',
  styleUrls: ['./list-pots.component.scss']
})
export class ListPotsComponent implements OnInit {

  colorsBackground: Array<string> = [
    'background-green-dark',
    'background-green-ligth',
    'background-green-cake',
    'bg-dark'];
  clase = [
    `card text-white ${this.colorsBackground[0]}`,
    `card text-white ${this.colorsBackground[1]}`,
    `card text-white ${this.colorsBackground[2]}`,
    `card text-white ${this.colorsBackground[3]}`
  ];

  pots: Array<Pot> = [];
  role: number;

  constructor(private potService: PotServiceService, private router: Router) {
    this.role = Number(localStorage.getItem('role'));
   }

  async ngOnInit() {
    const userId = localStorage.getItem('id');

    if (!userId) {
      this.router.navigateByUrl('/login');
    }else {
      this.getPots();
    }
    
  }

  async agregarMatera()
  {
    let potNew: Pot;
    await Swal.mixin({
      input: 'number',
      confirmButtonText: 'Siguiente &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2', '3']
    }).queue([
      {
        title: 'Felicidades!! \nNuevo integrante en la familia',
        text: 'Ingresa el código que tiene tu matera en la parte posterior.',
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value !== '' && value > '0') {
              resolve()
            } else {
              resolve('El código lo encuentras en mi maceta. Por favor, búscalo. 🙄')
            }
          })
        }
      },
      {
        title: '¿Cómo me llamo?',
        text: 'Ingresa el nombre de tu matera.',
        input: 'text',
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value !== '') {
              resolve()
            } else {
              resolve('¿Cuál será mi nombre? 😟')
            }
          })
        }
      },
      {
        title: '¿Qué tipo de planta soy?',
        input: 'select',
        inputOptions: {
          'Tipo de planta': {
            Cactus: 'Cactus',
            Dracena: 'Dracena',
            Potos: 'Potos',
            Aspidistra: 'Aspidistra',
            Sansevieria: 'Sansevieria'
          }
        },
        inputPlaceholder: 'Selecciona',
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value === 'Cactus' || value === 'Dracena' || value === 'Potos' 
            || value === 'Aspidistra' || value === 'Sansevieria') {
              resolve()
            } else {
              resolve('Debes elegir una opción 🙈🙈')
            }
          })
        }
      }
    ]).then((result: any) => {
      if (result.value) {
        const answers = JSON.stringify(result.value)
        potNew = {
          id: result.value[0],
          name: result.value[1],
          type: result.value[2],
          user: {
            id: Number(localStorage.getItem('id'))
          }
        }

        this.potService.updatePotById(potNew.id, potNew).subscribe(pot => {
          Swal.fire({
            title: 'Agregado con éxito!',
            html: `
              <br>
              El nuevo integrante es:
              <p></p>
              <h3><strong>${potNew.name}</strong></h3>
              <p>Código: ${potNew.id}</p>
              <p>Tipo de planta: ${potNew.type}</p>
              <p>🎉🎉🎉🎉🎉🎉🎉🎉🎉</p>
            `,
            confirmButtonText: 'Estupendo!'
          })
          this.getPots();
        }, err => {
          this.showErrorMesage(err, 'No se encuentra la maceta con ese identificador');
        })
      }
      else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: 'Lástima!',
          html: `
            <br>
            <p>Estábamos emocionados por la llegada de un nuevo integrante a la familia. 😔</p>
            <p>Esperamos sea pronto.</p>
            <p>Buen día! 😊</p>
          `,
          confirmButtonText: 'Cerrar'
        })
      }
    });
  }

  showErrorMesage(error, message) {
    if (error.status === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ha ocurrido un error con nuestros servidores 😢'
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: message
      });
    }
  }

  getPots() {
    const userId = localStorage.getItem('id');

    this.potService.getPodsByUserId(Number(userId)).subscribe(pots => {
      this.pots = pots;
    }, err => {
      this.showErrorMesage(err, 'No tienes macetas asociadas!');
    });
  }
  crearMatera() {
    this.potService.createPot().subscribe(pot => {
      Swal.fire({
        icon: 'success',
        title: 'Genial!',
        text: 'Se ha creado la matera con éxito!'
      });
    }, err => {
      this.showErrorMesage(err, 'No se pudo crear una nueva maceta');
    });
  } 
}
