package com.getclub.covid19.servicio.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.type.descriptor.sql.TinyIntTypeDescriptor;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Collection;

@Getter
@Setter
@NoArgsConstructor
public class PersonaDTO {

    private String strNumeroDocumento;
    private int decTemperatura;
    private Timestamp dtFechaCreacion;

}
