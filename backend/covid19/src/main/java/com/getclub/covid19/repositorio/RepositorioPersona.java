package com.getclub.covid19.repositorio;

import java.util.List;

import com.getclub.covid19.dominio.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@SuppressWarnings("unused")
@Repository
public interface RepositorioPersona extends JpaRepository<Persona, String> {
}
