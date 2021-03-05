import { Component, OnInit } from '@angular/core';
import { Covid19Facade } from '../../covid19-Facade';
import { PersonaViewModel } from '../../models/person.model';

@Component({
  selector: 'app-person-container',
  templateUrl: './person-container.component.html',
  styleUrls: ['./person-container.component.css']
})
export class PersonContainerComponent implements OnInit {

  constructor(private covid19Facade: Covid19Facade) { }

  ngOnInit(): void {

  }

  onFilaAgregada(e: PersonaViewModel) {
    this.covid19Facade.agregarPersona(e);
  }
}
