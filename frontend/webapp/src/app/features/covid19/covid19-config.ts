
export const COVID19_CONFIG = {
  requests: {
    listCandidates: {
      name: 'obtenerPersonas',
      url: `servicio-covid19/api/v1/Persona/`, // `${APP_CONFIG.apiBaseUrl}/candidates.json`,
    },
    add: {
      name: 'guardarPersona',
      url: `servicio-covid19/api/v1/Persona/`,
    },
    update: {
      name: 'actualizarPersona',
      url: `servicio-covid19/api/v1/Persona/:id`,
    },
    remove: {
      name: 'eliminarPersona',
      url: `servicio-covid19/api/v1/Persona/:id`,
    },
  }
};
