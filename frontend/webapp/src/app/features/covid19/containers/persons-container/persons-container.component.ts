import { Component, OnInit } from '@angular/core';
import { Covid19Facade } from '../../covid19-Facade';

@Component({
  selector: 'app-persons-container',
  templateUrl: './persons-container.component.html',
  styleUrls: ['./persons-container.component.css']
})
export class PersonsContainerComponent implements OnInit {

  constructor(private covid19Facade: Covid19Facade) { }

  ngOnInit(): void {
    this.covid19Facade.cargarPersonas().subscribe();
  }

}
