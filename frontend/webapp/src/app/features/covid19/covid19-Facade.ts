/**
 * @fileoverview Fachada Covid19 ( Persona ), clase encargada de la comunicacion con el BackEnd y la gestion de estado
 *
 * @version             1.0
 *
 * @author              Jackson Enrique Mosquera Rivas <snaft.j1@gmail.com>
 * @copyright           tayudo
 *
 * History
 * v1.0 – Se realizo la implementacion basica, basada en observadores reactivos
 * ----
 * La primera versión de Covid19Facade fue escrita por Jackson E. Mosquera R.
 */
 import {Injectable} from '@angular/core';
 import {Observable, Subscription} from 'rxjs';
 import {share, tap} from 'rxjs/operators';

 import {PersonaService} from './services/person.service';
 import {PersonaState} from './states/person.state';
 import {PersonaViewModel} from './models/person.model';

 /**
  * @desc esta clase tendrá funciones para la interacción con los estados y los servicios
  * por ejemplo getActualizando$(), getPersonas$(), cargarPersonas(), agregarPersona()
  * @author Jackson Enrique Mosquera Rivas snaft.j1@gmail.com
  * @required Persona.service, Persona.state, Persona.model
  */
 @Injectable({
   providedIn: 'root'
 })
 export class Covid19Facade {
   constructor(
     private PersonaService: PersonaService,
     private PersonaState: PersonaState) {

   }

   /**
    * @description Obtiene un obervable encargado de la evolucion de Persona que se este ejecutando
    * @return {Observable<boolean>}
    */
   getActualizando$(): Observable<boolean> {
     return this.PersonaState.getActualizando$();
   }

   /**
    * @description Obtiene un observable con el listado de objetos tipo Persona
    * @return {Observable<PersonaViewModel[]>}
    */
   getPersonas$(): Observable<PersonaViewModel[]> {
     // aquí solo pasamos el estado sin proyecciones
     // Puede suceder que sea necesario combinar dos o más flujos y exponerlos a los componentes.
     return this.PersonaState.getPersonas$();
   }

   /**
    * @description Obtiene un listado de objetos tipo Persona que seran gestionados por PersonasState
    * @return {Observable<PersonaViewModel[]>}
    */
   cargarPersonas() {
     console.log('Cargando Personas...');
     return this.PersonaService.obtenerPersonas()
       .pipe(tap(response => this.PersonaState.setPersonas(response)));
   }

   // Actualizacion optimista
   // 1. Actualiza el estado de la UI
   // 2. Invoca el API
   /**
    * @description Agrega un nuevo objeto a la coleccion de estado e invoca el API
    */
   agregarPersona(requisito: PersonaViewModel) {

    // this.PersonaState.agregarPersona(requisito);  //TODO: optimizar
    this.PersonaService.guardarPersona(requisito)
       .subscribe(
         (addedCategoryWithId: PersonaViewModel) => {
           // retorno exitoso - tenemos una identificación generada por el servidor, actualice el estado
           this.PersonaState.actualizarPersonaXId(requisito, addedCategoryWithId);
         },
         (error: any) => {
           // retorno error - necesitamos revertir el cambio de estado
           this.PersonaState.eliminarPersona(requisito);
           console.log(error);
         }
       );
   }

   // Actualizacion pesimista
   // 1. Invoca el API
   // 2. Actualiza el estado de la UI
   /**
    * @description Actualiza un objeto invoca el API y actualiza el objeto de la coleccion de estado
    */
   actualizarPersona(requisito: PersonaViewModel) {
     this.PersonaState.setActualizando(true);
     this.PersonaService.actualizarPersona(requisito)
       .subscribe(
         () => this.PersonaState.actualizarPersona(requisito),
         (error) => console.log(error),
         () => this.PersonaState.setActualizando(false)
       );
   }

   // Actualizacion pesimista
   // 1. Invoca el API
   // 2. Actualiza el estado de la UI
   /**
    * @description Elimina un objeto invoca el API y remueve el objeto de la coleccion de estado
    */
   eliminarPersona(persona: PersonaViewModel) {
     this.PersonaState.setActualizando(true);
     this.PersonaService.eliminarPersona(persona.strNumeroDocumento!)
       .subscribe(
         () => this.PersonaState.eliminarPersona(persona),
         (error) => console.log(error),
         () => this.PersonaState.setActualizando(false)
       );
   }
 }
