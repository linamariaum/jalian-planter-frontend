import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  d () {
    this.router.navigate(['/evaluaciones_CorNotas']);
  }

}

//*  Enviar parametros a una ruta  *//
// this.router.navigate(['/evaluaciones_CorNotas',
//       { docente: this.gruposConCorreciones[id].docDocente,
//         nombre: this.gruposConCorreciones[id].nombreDocente,
//         semestre: this.gruposConCorreciones[id].semestre,
//         materia: this.gruposConCorreciones[id].codMateria,
//         apocope: this.gruposConCorreciones[id].apocope,
//         grupo: this.gruposConCorreciones[id].grupo
//     }]);

// *   Recibir parametros  * //
// this.route.paramMap.subscribe(params => {
//   this.docente = params.get('docente');
//   this.nombreDocente = params.get('nombre');
//   this.semestre = params.get('semestre');
//   this.materia = params.get('materia');
//   this.apocope = params.get('apocope');
//   this.grupo = params.get('grupo');
//   if (this.docente !== null && this.nombreDocente !== '' && this.semestre !== null &&
//   this.materia !== '' && this.apocope !== '' && this.grupo !== '') {
//     this.buscar();
//   } else {
//     this.router.navigate(['parametros_invalidos']);
//     return;
//   }
// });