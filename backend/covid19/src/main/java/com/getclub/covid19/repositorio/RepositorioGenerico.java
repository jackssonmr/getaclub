package com.getclub.covid19.repositorio;

public interface RepositorioGenerico<T> {

    T GuardarDatos(T t);

    void EliminarDatos(T t);

    T ObtenerDatos(T t);

    T ActualizarCambios(T t);

    Iterable<T> ObtenerTodos();
}
