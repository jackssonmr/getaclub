import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import { Covid19Facade } from '../../covid19-Facade';

import { PersonaViewModel } from '../../models/person.model';
import { PersonaState } from '../../states/person.state';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  @Input() persona$: PersonaViewModel[] = [];
  @Output() onFilaAgregada: EventEmitter<PersonaViewModel>;

  nuevaPersona: PersonaViewModel = new PersonaViewModel();
  actualizando$: Observable<boolean>;
//  personaSubcription: Subscription; //TODO: en caso de usar modificacion por componente

  buttonOptions: any = {
    text: 'Guardar',
    type: 'success',
    onClick: this.agregarPersona.bind(this)
    // useSubmitBehavior: true
  };

  constructor(
    private covid19Facade: Covid19Facade,
    private personaState: PersonaState
    ) {
      this.onFilaAgregada = new EventEmitter<PersonaViewModel>();
      this.actualizando$ = covid19Facade.getActualizando$();
    }

  ngOnInit(): void {
  }

  agregarPersona(e: any) {
    console.log(this.nuevaPersona);
    this.onFilaAgregada.emit(this.nuevaPersona);
    this.nuevaPersona = new PersonaViewModel();
  }

}
