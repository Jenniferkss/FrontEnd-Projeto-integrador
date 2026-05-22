import { request } from './api.js';

const SIMULADO_PATH = '/api/integracao/simulado';

export async function fetchSimulado(signal) {
    try {
        const payload = await request(SIMULADO_PATH, { signal });
        return payload;
    } catch (error) {
        if (error.name === 'AbortError' || (signal && signal.aborted)) {
            throw error;
        }
        throw new Error(error.message || 'Não foi possível carregar o Simulado.', { cause: error });
    }
}
