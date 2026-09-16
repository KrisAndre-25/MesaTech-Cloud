import axios from 'axios';
import { bffBaseUrl, apiRequest } from './authConfig';

export async function obtenerAccessToken(instance, account) {
  try {
    const respuesta = await instance.acquireTokenSilent({ ...apiRequest, account });
    return respuesta.accessToken;
  } catch (error) {
    const respuesta = await instance.acquireTokenPopup(apiRequest);
    return respuesta.accessToken;
  }
}

export function crearClienteApi(token) {
  return axios.create({
    baseURL: bffBaseUrl,
    headers: { Authorization: `Bearer ${token}` },
  });
}
