import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Pot } from 'src/app/models/pot';

@Component({
  selector: 'app-list-pots',
  templateUrl: './list-pots.component.html',
  styleUrls: ['./list-pots.component.scss']
})
export class ListPotsComponent implements OnInit {
  pots2: Pot[]
  pots: Array<any> = [];
  message = false;

  constructor() { }

  async ngOnInit() {
    await this.prueba()
    this.pots2 = [
      {
        id: 11,
        name: 'Rolfi',
        type: 'Tipo 3'
      },
      {
        id: 12,
        name: 'Berta',
        type: 'Tipo 3'
      },
      {
        id: 13,
        name: 'Orqui',
        type: 'Tipo 3'
      },
      {
        id: 14,
        name: 'Petunia',
        type: 'Tipo 3'
      }
    ]
  }

  prueba() {
    this.pots = [
      {
        name: 'Nombre',
        type: 'tipito',
        hourlyIntensity: '20 horas',
        description: 'LA LA LA ALAL laslfa la',
        cost: {
          udea: '15',
          general: '18',
          companies: '22'
        },
        link: 'www.github.com'
      },
      {
        name: 'Nombre',
        type: 'tipito',
        hourlyIntensity: '20 horas',
        description: 'LA LA LA ALAL laslfa la',
        cost: {
          udea: '15',
          general: '18',
          companies: '22'
        },
        link: 'www.github.com'
      },
      {
        name: 'Nombre',
        type: 'tipito',
        hourlyIntensity: '20 horas',
        description: 'LA LA LA ALAL laslfa la',
        cost: {
          udea: '15',
          general: '18',
          companies: '22'
        },
        link: 'www.github.com'
      }
    ]
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
              resolve('Cuál será mi nombre? 😟')
            }
          })
        }
      },
      {
        title: '¿Qué tipo de planta soy?',
        input: 'select',
        inputOptions: {
          'Tipo de planta': {
            tipo1: 'Tipo 1',
            tipo2: 'Tipo 2',
            tipo3: 'Tipo 3',
            tipo4: 'Tipo 4',
            tipo5: 'Tipo 5'
          }
        },
        inputPlaceholder: 'Selecciona',
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value === 'tipo1' || value === 'tipo2' || value === 'tipo3' || value === 'tipo4' || value === 'tipo5') {
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
          type: result.value[2]
        }
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

    console.log(potNew)

  }

}
