import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements OnInit {
  @Input() titulo: string;
  @Input() ejemplo: string;
  @Input() tipo: string;
  @Output() contenido = new EventEmitter<string>();
  @Output() valido = new EventEmitter<boolean>();
  value = ''
  controlForm: FormGroup;
  
  constructor() { }

  ngOnInit(): void {
    if (this.tipo === 'email'){
      this.controlForm = new FormGroup({
        content: new FormControl('', [Validators.required, Validators.email])
      });
    }
    if (this.tipo === 'password'){
      this.controlForm = new FormGroup({
        content: new FormControl('', [Validators.required, Validators.minLength(8)])
      });
    }
  }

  update(value: string) { 
    this.value = value;
    this.contenido.emit(this.value);
    this.valido.emit(!this.controlForm.invalid)
  }

  public getError(controlName: string): string {
    let error = '';
    const control = this.controlForm.get(controlName);
    if (control.touched && control.errors != null) {
      error = JSON.stringify(control.errors);
      if (control.errors.required) {
        return 'Campo requerido.';
      }
      if (control.errors.email) {
        return 'Debe ingresar un correo electrónico válido.';
      }
      if (control.errors) {
        return 'Debe ingresar mínimo 8 caracteres.';
      }
    } else {
      return error;
    }
  }

}
