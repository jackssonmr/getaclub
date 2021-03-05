/**
 * @fileoverview ViewModel, Clase que representa al modelo de datos suministrado por el BackEnd
 *
 * @version             1.0
 *
 * @author              Jackson Enrique Mosquera Rivas <jackson.mosque@radartechnologies.com.co>
 * @copyright           getclub.io
 *
 * History
 * ----
 * La primera versión de PersonaFacade fue escrita por Jackson E. Mosquera R.
 */

/**
 * @class Clase que representa al modelo de datos suministrado por el BackEnd
 */
 export class PersonaViewModel {
   intId?: number;
   strNumeroDocumento?: string;
   decTemperatura: number = 0;
   dtFechaCreacion?: string;
}

export class AreaViewModel {
  strNombre: string = '';
  strCantidad: number = 0;
}
