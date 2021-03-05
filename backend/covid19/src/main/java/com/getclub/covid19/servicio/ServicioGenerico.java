package com.getclub.covid19.servicio;

import java.util.List;

public interface ServicioGenerico<T> {
    /**
     * Guarda o actualiza los datos de un actividad.
     *
     * @param entidadDTO entidad que sera almacenada
     * @return entidad almacenada en la base de datos
     */
    T GuardarActualizar(T entidadDTO) throws Exception;

    /**
     * Lista todos las entidades (actividad) existentes
     *
     * @return lista de entidades almacenadas en la base de datos
     */
    List<T> ObtenerEntidades() throws Exception;

    /**
     * Obtiene el actividad segun el id suministrado.
     *
     * @param id entidad
     * @return entidad almacenada en la base de datos
     */
    T BuscarEntidad(String id) throws Exception;

    /**
     * Guarda o actualiza los datos de un actividad.
     *
     * @param id entidad que sera eliminada
     */
    void EliminarEntidad(String id) throws Exception;
}
