import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OptionItem } from 'src/app/models/optionItem';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss']
})
export class FormSelectComponent implements OnInit {
  @Input() titleOption: string;
  @Input() items: OptionItem[];
  @Output() selected = new EventEmitter<string>();
  controlForm: FormGroup;
  
  constructor() { }

  ngOnInit(): void {
    this.controlForm = new FormGroup({
      select: new FormControl('', Validators.required)
    });
  }

  onClick() {
    this.selected.emit(this.controlForm.get('select').value);
  }

}
