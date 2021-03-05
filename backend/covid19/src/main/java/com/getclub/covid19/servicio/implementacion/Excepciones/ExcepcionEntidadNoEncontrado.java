package com.getclub.covid19.servicio.implementacion.Excepciones;

public class ExcepcionEntidadNoEncontrado extends RuntimeException {
    public ExcepcionEntidadNoEncontrado(Double id) {
        super("No se puede encontrar la entidad " + id);
    }

    public ExcepcionEntidadNoEncontrado(String usuario) {
        super("No se puede encontrar la entidad " + usuario);
    }


}
