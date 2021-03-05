package com.getclub.covid19.servicio.mapeo;

import java.util.List;

/**
 * Contract for a generic dto to entity mapper.
 *
 * @param <D> - DTO type parameter.
 * @param <E> - Entity type parameter.
 */

public interface MapeoEntidadesGenerico<D, E> {

    E obtenerEntidad(D dto);

    D obtenerDto(E entidad);

    List<E> obtenerEntidad(List<D> listaDto);

    List<D> obtenerDto(List<E> listaEntidades);
}
