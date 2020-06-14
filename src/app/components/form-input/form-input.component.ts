import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  value = ''
  
  constructor() { }

  ngOnInit(): void {
  }

  update(value: string) { 
    this.value = value;
    this.contenido.emit(this.value);
  }

}
