/**
 * @fileoverview PersonaState, clase encargada de la de estados en los datos obtenidos desde el BackEnd
 *
 * @version             1.0
 *
 * @author              Jackson Enrique Mosquera Rivas <snaft.j1@gmail.com>
 * @copyright           tayudo
 *
 * History
 * v1.0 – Se realizo la implementacion basica, basada en observadores reactivos
 * ----
 * La primera versión de RequisitoService fue escrita por Jackson E. Mosquera R.
 */
 import {Injectable} from "@angular/core";
 import {BehaviorSubject} from "rxjs";
 import {PersonaViewModel} from "../models/person.model";
 /**
  * @desc esta clase tendrá funciones para la interacción con el BackEnd
  * por ejemplo getActualizando$(), setActualizando(), getPersonas$(), actualizarPersona(), actualizarPersonaXId()
  * @author Jackson Enrique Mosquera Rivas snaft.j1@gmail.com
  * @required Persona.config.ts
  */
 @Injectable({
   providedIn: 'root'
 })
 export class PersonaState {
   private actualizando$ = new BehaviorSubject<boolean>(false);
   private PersonaSubject$ = new BehaviorSubject<PersonaViewModel[]>([]);
   private PersonaActualSubject$ = new BehaviorSubject<PersonaViewModel>(new PersonaViewModel());
   /**
    * @description Obtiene un valor booleano indicando si el estado esta en Persona o no
    * @return {Observable<Boolean>}
    */
   getActualizando$() {
     return this.actualizando$.asObservable();
   }
   /**
    * @description Estable un valor booleano indicando si el estado esta en Persona o no
    */
   setActualizando(actualizando: boolean) {
     this.actualizando$.next(actualizando);
   }
   /**
    * @description Obtiene un observable con la lista de Personaes existentes
    * @return {Observable<PersonaViewModel[]>}
    */
   getPersonas$() {
     return this.PersonaSubject$.asObservable();
   }
   /**
    * @description Establece una lista de Personaes a ser gestionados
    * @param {PersonaViewModel[]} coleccion de objetos que sera gestionado
    */
   setPersonas(entidades: PersonaViewModel[]) {
     console.log('estados...');
     console.log(entidades);
     this.PersonaSubject$.next(entidades);
   }
   /**
    * @description Obtiene un observable con la lista de Personaes existentes
    * @return {Observable<PersonaViewModel>}
    */
   getPersona$() {
     return this.PersonaActualSubject$.asObservable();
   }
   /**
    * @description Establece una lista de Personas a ser gestionados
    * @param {PersonaViewModel[]} coleccion de objetos que sera gestionado
    */
   setPersona(entidad: PersonaViewModel) {
     console.log('estados...');
     console.log(entidad);
     this.PersonaActualSubject$.next(entidad);
   }
   /**
    * @description Agrega un Persona a la gestion realizada por estados
    * @param {PersonaViewModel} objeto que sera agregado y gestionado
    */
   agregarPersona(entidad: PersonaViewModel) {
     const valorActual = this.PersonaSubject$.getValue();
     this.PersonaSubject$.next([...valorActual, entidad]);
   }
   /**
    * @description Agrega un Persona que sera actualizado en la gestion realizada por estados
    * @param {PersonaViewModel} objeto que sera actualizado y gestionado
    */
   actualizarPersona(entidadActualizar: PersonaViewModel) {
     const entidades = this.PersonaSubject$.getValue();
     const indiceActualizar = entidades.findIndex(entidad => entidad.strNumeroDocumento === entidadActualizar.strNumeroDocumento);
     entidades[indiceActualizar] = entidadActualizar;
     this.PersonaSubject$.next([...entidades]);
   }
   /**
    * @description Inserta o clona un Persona en la gestion realizada por estados
    * @param {PersonaViewModel} objeto que sera actualizado y gestionado
    */
   actualizarPersonaXId(entidadReemplazar: PersonaViewModel, entidadAgregarXId: PersonaViewModel) {
     const entidades = this.PersonaSubject$.getValue();
     const indiceLocalizado = entidades.findIndex(entidad => entidad === entidadReemplazar);
     entidades[indiceLocalizado] = entidadAgregarXId;
     this.PersonaSubject$.next([...entidades]);
   }
   /**
    * @description Remueve un Persona de la gestion realizada por estados
    * @param {PersonaViewModel} objeto que sera removido y gestionado
    */
   eliminarPersona(entidadEliminar: PersonaViewModel) {
     const valorActual = this.PersonaSubject$.getValue();
     this.PersonaSubject$.next(valorActual.filter(entidad => entidad !== entidadEliminar));
   }
 }
