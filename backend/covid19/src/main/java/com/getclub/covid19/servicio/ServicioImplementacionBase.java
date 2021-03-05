package com.getclub.covid19.servicio;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;

public class ServicioImplementacionBase<T> implements ServicioGenerico<T> {

    private Class<T> type;

    private final Logger log = LoggerFactory.getLogger(type);

    public ServicioImplementacionBase() {
        Type t = getClass().getGenericSuperclass();
        ParameterizedType pt = (ParameterizedType) t;
        type = (Class) pt.getActualTypeArguments()[0];
    }

    @Override
    public T GuardarActualizar(T entidadDTO) throws Exception {
        return null;
    }

    @Override
    public List<T> ObtenerEntidades() throws Exception {
        return null;
    }

    @Override
    public T BuscarEntidad(String id) throws Exception {
        return null;
    }

    @Override
    public void EliminarEntidad(String id) throws Exception {

    }
}
