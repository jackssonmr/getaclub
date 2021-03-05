package com.getclub.covid19.dominio;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.type.descriptor.sql.TinyIntTypeDescriptor;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Collection;
import java.util.Objects;

@Entity
//@Table(name = "Persona", schema = "covid19", catalog = "")

@Getter
@Setter
@NoArgsConstructor
public class Persona implements Serializable {

    @Id
    //@GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "strNumeroDocumento", nullable = false, length = 18 )
    private String strNumeroDocumento;

    @Basic
    @Column(name = "decTemperatura", nullable = true)
    private BigDecimal decTemperatura;

    @Basic
    @Column(name = "dtFechaCreacion", nullable = true)
    private Timestamp dtFechaCreacion;

}

