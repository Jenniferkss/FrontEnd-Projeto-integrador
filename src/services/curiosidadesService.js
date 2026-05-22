import { request } from './api.js';

const CURIOSIDADES_PATH = '/api/integracao/curiosidades';

export async function fetchCuriosidades(signal) {
    try {
        const payload = await request(CURIOSIDADES_PATH, { signal });
        return payload;
    } catch (error) {
        if (error.name === 'AbortError' || (signal && signal.aborted)) {
            throw error;
        }
        throw new Error(error.message || 'Não foi possível carregar as Curiosidades.', { cause: error });
    }
}
