package com.getclub.covid19.servicio.mapeo;

import com.getclub.covid19.dominio.Persona;
import com.getclub.covid19.servicio.dto.PersonaDTO;

import com.getclub.covid19.dominio.Persona;
import com.getclub.covid19.servicio.dto.PersonaDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring") //, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MapeoPersona extends MapeoEntidadesGenerico<PersonaDTO, Persona> {

    @Mapping(source = "strNumeroDocumento", target = "strNumeroDocumento")
        //TODO: deben ser el campo clave de la base de datos ( la llave )
    PersonaDTO obtenerDto(Persona entidad);

    @Mapping(source = "strNumeroDocumento", target = "strNumeroDocumento")
    Persona obtenerEntidad(PersonaDTO entidadDTO);

    default Persona desdeId(String strNumeroDocumento) {
      if (strNumeroDocumento == null) {
           return null;
        }
        Persona entidad = new Persona();
        entidad.setStrNumeroDocumento(strNumeroDocumento);
        return entidad;
    }
}
