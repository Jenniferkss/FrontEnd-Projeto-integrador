import { request } from './api.js';

const OBRA_PATH = '/api/integracao/obra';

export async function fetchObra(signal) {
    try {
        const payload = await request(OBRA_PATH, { signal });
        return payload;
    } catch (error) {
        if (error.name === 'AbortError' || (signal && signal.aborted)) {
            throw error;
        }
        throw new Error(error.message || 'Não foi possível carregar os dados da Obra.', { cause: error });
    }
}
