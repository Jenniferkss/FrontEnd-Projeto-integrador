import { request } from './api.js';

const DICAS_PATH = '/api/integracao/dicas';

export async function fetchDicas(signal) {
    try {
        const payload = await request(DICAS_PATH, { signal });
        return payload;
    } catch (error) {
        if (error.name === 'AbortError' || (signal && signal.aborted)) {
            throw error;
        }
        throw new Error(error.message || 'Não foi possível carregar as Dicas.', { cause: error });
    }
}
