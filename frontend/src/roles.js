// Los App Roles (ROLE_CLIENTE/ROLE_OPERADOR/ROLE_ADMINISTRADOR) viajan en el
// claim "roles" del Access Token emitido para la API (mesatech-api), no en
// el ID Token (cuya audiencia es la SPA) - por eso hay que decodificarlo
// directamente en vez de leer accounts[0].idTokenClaims.
export function obtenerRolesDeToken(accessToken) {
  try {
    const payload = accessToken.split('.')[1];
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(json).roles || [];
  } catch (error) {
    return [];
  }
}

// Refleja la maquina de estados validada en solicitudes-service (SolicitudService).
export const TRANSICIONES_VALIDAS = {
  CREADA: ['ASIGNADA', 'CANCELADA'],
  ASIGNADA: ['EN_PROCESO', 'CANCELADA'],
  EN_PROCESO: ['RESUELTA', 'CANCELADA'],
  RESUELTA: ['CERRADA'],
  CERRADA: [],
  CANCELADA: [],
};
