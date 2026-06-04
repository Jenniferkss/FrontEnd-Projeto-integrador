import { request } from './api.js';

/**
 * Serviços genéricos CRUD para o backend
 * 
 * Uso:
 *   getAll('/api/videoaula')            → lista todas
 *   getById('/api/videoaula', 5)        → busca por ID (se backend suportar)
 *   getAll('/api/integracao/biblioteca') → lista fontes
 */

export async function getAll(endpoint, options = {}) {
  try {
    const data = await request(endpoint, options);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(`Erro ao buscar ${endpoint}:`, error);
    throw error;
  }
}

export async function getById(endpoint, id, options = {}) {
  try {
    const data = await request(`${endpoint}/${id}`, options);
    return data;
  } catch (error) {
    console.error(`Erro ao buscar ${endpoint}/${id}:`, error);
    throw error;
  }
}