package com.getclub.covid19.servicio.implementacion;

import com.getclub.covid19.dominio.Persona;
import com.getclub.covid19.repositorio.RepositorioPersona;
import com.getclub.covid19.servicio.ServicioPersona;
import com.getclub.covid19.servicio.dto.PersonaDTO;
import com.getclub.covid19.servicio.implementacion.Excepciones.ExcepcionEntidadNoEncontrado;
import com.getclub.covid19.servicio.mapeo.MapeoPersona;
import org.mapstruct.factory.Mappers;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Transactional
public class ServicioPersonaImpl implements ServicioPersona {
    private final Logger log = LoggerFactory.getLogger(ServicioPersonaImpl.class);

    private final RepositorioPersona repositorioPersona;

    private final MapeoPersona mapeoPersona = Mappers.getMapper(MapeoPersona.class);

    public ServicioPersonaImpl(RepositorioPersona repositorioPersona) {
        this.repositorioPersona = repositorioPersona;
    }

    @Override
    public PersonaDTO GuardarActualizar(PersonaDTO PersonaDTO) throws Exception {
        log.debug("Solicitud para guardar la entidad : {}", PersonaDTO);

        //TODO> agregar validacion especifica de la clase servicio
        Persona Persona = mapeoPersona.obtenerEntidad(PersonaDTO);
        Persona = repositorioPersona.save(Persona);

        PersonaDTO entidadActual = mapeoPersona.obtenerDto(Persona);
        return entidadActual;
    }

    @Override
    public List<PersonaDTO> ObtenerEntidades() throws Exception {
        log.debug("Solicitud para listar todos las Entidades");
        return mapeoPersona.obtenerDto(repositorioPersona.findAll());
    }

    @Override
    public PersonaDTO BuscarEntidad(String id) throws Exception {
        log.debug("Solicitud para buscar la Persona : {}", id);
        Persona usuarioBuscado = repositorioPersona.findById(id)
                .orElseThrow(() -> new ExcepcionEntidadNoEncontrado(id));
        return mapeoPersona.obtenerDto(usuarioBuscado);
    }

    @Override
    public void EliminarEntidad(String id) throws Exception {
        log.debug("Solicitud para eliminar la entidad : {}", id);
        repositorioPersona.deleteById(id);
    }
}
