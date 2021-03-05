/**
 * @fileoverview Servicio Persona, clase encargada de la comunicacion con el BackEnd, relativa a Personas
 *
 * @version             1.0
 *
 * @author              Jackson Enrique Mosquera Rivas <snaft.j1@gmail.com>
 * @copyright           getclub.io
 *
 * History
 * v1.0 – Se realizo la implementacion basica, basada en observadores reactivos
 * ----
 * La primera versión de PersonaService fue escrita por Jackson E. Mosquera R.
 */
 import { Injectable } from '@angular/core';
 import {Observable} from "rxjs";
 import { HttpClient } from '@angular/common/http';

 import {PersonaViewModel} from "../models/person.model";

 /**
  * @desc esta clase tendrá funciones para la interacción con el BackEnd
  * por ejemplo obtenerPersonas(), guardarPersona(), actualizarPersona(), eliminarPersona()
  * @author Jackson Enrique Mosquera Rivas snaft.j1@gmail.com
  * @required Persona.config.ts
  */
 @Injectable({
   providedIn: 'root'
 })
 export class PersonaService {

   /**
    * Propiedad que indica el recurso a consumir.
    * @type {String}
    */

   //TODO: usar contante de configuracion local
   API: string = `http://localhost:8080/api/v1/Persona/`;

   /** @constructor */
   constructor(private http: HttpClient) {
   }

   /**
    * @description Obtiene un listado de objetos tipo Persona
    * @return {Observable<PersonaViewModel[]>}
    */
   obtenerPersonas(): Observable<PersonaViewModel[]> {
     return new Observable((observer) => {
         /*
         this.get<PersonaViewModel[]>(this.API).then((res : Array<PersonaViewModel>) => {
           observer.next(res['_embedded']['PersonaDTOList']);
           observer.complete();
         });
         */
       this.http.get<any>(this.API).subscribe((res : any) => {
         console.log(res);
         observer.next(res._embedded.personaDTOList);
         observer.complete();
       });
     });
   }

   /**
    * @description Obtiene un listado de objetos tipo Persona
    * @param {number} entidad, Objeto que sera almacenado por el BackEnd
    * @return {Observable<PersonaViewModel[]>}
    */
   obtenerPersonaXModalidad(entidad: number): Observable<PersonaViewModel[]> {
     return new Observable((observer) => {
       this.http.get<PersonaViewModel[]>(this.API + entidad)
         .subscribe((res :any) => {
           let Personas: any = null;
           /*
           if(res['_embedded'] !== undefined)
             Personas = res['_embedded']['PersonaDTOList'];*/
           if(res._embedded !== undefined)
             Personas = res._embedded.PersonaDTOList;

           observer.next(Personas);
           observer.complete();
       });
     });
   }
   /**
    * @description Guarda un objeto
    * @param {PersonaViewModel} entidad, Objeto que sera almacenado por el BackEnd
    * @return {Observable<any>}
    */
   guardarPersona(entidad: PersonaViewModel): Observable<any> {
     return new Observable((observer) => {
       this.http.post<PersonaViewModel>(this.API, entidad).subscribe(r => {
         observer.next(r);
         observer.complete();
       });
     });
   }
   /**
    * @description Actualiza un objeto
    * @param {PersonaViewModel} entidad, objeto que sera actualizado por el BackEnd
    * @return {Observable<any>}
    */
   actualizarPersona(entidad: PersonaViewModel): Observable<any> {
     return new Observable((observer) => {
       this.http.put<PersonaViewModel>(`${this.API}/${entidad.strNumeroDocumento}`, entidad).subscribe(r => {
         observer.next(r);
         observer.complete();
       });
     });
   }
   /**
    * @description Elimina un objeto
    * @param {string} strNumeroDocumento que sera Eliminado por el BackEnd
    * @return {Observable<any>}
    */
   eliminarPersona(strNumeroDocumento: string): Observable<any> {
     return new Observable((observer) => {
       this.http.delete(`${this.API}/${strNumeroDocumento}`).subscribe(r => {
         observer.next(r);
         observer.complete();
       });
     });
   }
 }
