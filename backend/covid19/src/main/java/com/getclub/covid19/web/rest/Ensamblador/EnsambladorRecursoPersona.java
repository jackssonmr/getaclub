package com.getclub.covid19.web.rest.Ensamblador;


import com.getclub.covid19.servicio.dto.PersonaDTO;
import com.getclub.covid19.web.rest.RecursoPersona;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceAssembler;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

@Component
public class EnsambladorRecursoPersona implements ResourceAssembler<PersonaDTO, Resource<PersonaDTO>> {
    @Override
    public Resource<PersonaDTO> toResource(PersonaDTO entidadDTO) {
        return new Resource<>(entidadDTO,
                linkTo(methodOn(RecursoPersona.class).BuscarEntidad(entidadDTO.getStrNumeroDocumento())).withSelfRel(),
                linkTo(methodOn(RecursoPersona.class).ObtenerEntidades()).withRel("Persona"));
    }
}
