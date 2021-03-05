package com.getclub.covid19.web.rest;

import com.getclub.covid19.servicio.ServicioPersona;
import com.getclub.covid19.servicio.dto.PersonaDTO;
import com.getclub.covid19.web.rest.Ensamblador.EnsambladorRecursoPersona;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

@RestController
@RequestMapping("/api/v1")
@Api(value="Persona API", description="Gestión de Personas")
public class RecursoPersona {
    private final Logger log = LoggerFactory.getLogger(RecursoPersona.class);
    private final ServicioPersona servicioEntidad;
    private final EnsambladorRecursoPersona ensambladorRecursoEntidad;

    public RecursoPersona(ServicioPersona servicioEntidad,
                                    EnsambladorRecursoPersona ensambladorRecursoEntidad) {
        this.servicioEntidad = servicioEntidad;
        this.ensambladorRecursoEntidad = ensambladorRecursoEntidad;
    }

    @ApiOperation(value = "Lista los personas existentes", response = Iterable.class)
        @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Lista recuperada exitosamente"),
            @ApiResponse(code = 401, message = "No tiene autorización para ver el recurso."),
            @ApiResponse(code = 403, message = "Está prohibido acceder al recurso que intenta alcanzar"),
            @ApiResponse(code = 404, message = "No se encuentra el recurso que intentabas alcanzar")
        }
    )
    @GetMapping("/Persona")
    public Resources<Resource<PersonaDTO>> ObtenerEntidades() {

        List<Resource<PersonaDTO>> entidades = null;

        try {
            entidades = this.servicioEntidad.ObtenerEntidades().parallelStream()
                    .map(ensambladorRecursoEntidad::toResource)
                    .collect(Collectors.toList());
            Resources<Resource<PersonaDTO>> recursoRetorno = new Resources<Resource<PersonaDTO>>(entidades);
            recursoRetorno.add(linkTo(methodOn(RecursoPersona.class).ObtenerEntidades()).withSelfRel());
            return recursoRetorno;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @ApiOperation(value = "Obtiene la persona para ID seleccionado", response = Iterable.class)
        @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Lista recuperada exitosamente"),
            @ApiResponse(code = 401, message = "No tiene autorización para ver el recurso."),
            @ApiResponse(code = 403, message = "Está prohibido acceder al recurso que intenta alcanzar"),
            @ApiResponse(code = 404, message = "No se encuentra el recurso que intentabas alcanzar")
        }
    )
    @GetMapping("/Persona/{id}")
    public ResponseEntity<Resource<PersonaDTO>> BuscarEntidad(@PathVariable String id) {

        log.debug(String.format("servicio-covid19 BuscarEntidad() invocado:{} por {} ",
                servicioEntidad.getClass().getName(), id));

        try {
            return Optional.of(this.servicioEntidad.BuscarEntidad(id))
                    .map(u -> new ResponseEntity<>(ensambladorRecursoEntidad.toResource(u), HttpStatus.OK))
                    .orElse(new ResponseEntity<>(HttpStatus.NO_CONTENT));
        } catch (Exception e) {
            log.error("Ocurrio un error en la llamada REST BuscarEntidad", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/Persona")
    public ResponseEntity<?> GuardarEntidad(@RequestBody PersonaDTO entidadDTO) {

        Resource<PersonaDTO> resource = null;

        try {
            resource = ensambladorRecursoEntidad.toResource(servicioEntidad.GuardarActualizar(entidadDTO));

            return ResponseEntity
                    .created(new URI(resource.getId().expand().getHref()))
                    .body(resource);
        } catch (Exception e) {
            log.warn("Ocurrio un error en la llamada REST GuardarEntidad", e);
            return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @PutMapping("/Persona/{id}")
    public ResponseEntity<?> ActualizarEntidad(@RequestBody PersonaDTO entidadDTO, @PathVariable Long id) {
        return GuardarEntidad(entidadDTO);
    }

    @ApiOperation(value = "Elimina la persona solicitado", response = Iterable.class)
        @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Lista recuperada exitosamente"),
            @ApiResponse(code = 401, message = "No tiene autorización para ver el recurso."),
            @ApiResponse(code = 403, message = "Está prohibido acceder al recurso que intenta alcanzar"),
            @ApiResponse(code = 404, message = "No se encuentra el recurso que intentabas alcanzar")
        }
    )
    @DeleteMapping("/Persona/{id}")
    ResponseEntity<?> EliminarEntidad(@PathVariable String id) {
        log.debug("Solicitud REST para Eliminar la entidad : {}", id);
        try {
            servicioEntidad.EliminarEntidad(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.noContent().build();
    }
}
