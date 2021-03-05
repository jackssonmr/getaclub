import { Component, OnDestroy, OnInit } from '@angular/core';
import {Observable, Subscription} from 'rxjs';

import { Covid19Facade } from '../../covid19-Facade';
import { AreaViewModel, PersonaViewModel } from '../../models/person.model';
import { PersonaState } from '../../states/person.state';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent  implements OnInit {

  actualizando$: Observable<boolean>;
  coleccionPersonas: PersonaViewModel[] = [];
  clasificados: AreaViewModel[] = [];

  constructor(private covid19Facade: Covid19Facade, private ordenState: PersonaState) {

    this.actualizando$ = this.covid19Facade.getActualizando$();

    this.covid19Facade.getPersonas$()
      .subscribe( ( resp ) => {
        this.coleccionPersonas = resp;
        this.groupBy(this.coleccionPersonas);
      });

  }

  ngOnInit(): void {
  }

  customizeLabel(point : any) {
    return point.argumentText + ": " + point.valueText;
  }

  groupBy(list: PersonaViewModel[]) {
    let countCovid19 : number = 0;
    let noCovid19 : number = 0;
    this. clasificados = [];

    for (const item of list) {
      console.log(item);
      if(item.decTemperatura >= 37) {
        countCovid19++;
      }else{
        noCovid19++;
      }
    }

    this.clasificados.push({
      'strNombre': 'Covid19',
      'strCantidad': countCovid19
    });

    this.clasificados.push({
      'strNombre': 'Normales',
      'strCantidad': noCovid19
    });
}

}
