import { request } from './api.js';

const EQUIPE_PATH = '/api/integracao/equipe';

export async function fetchEquipe(signal) {
    try {
        const payload = await request(EQUIPE_PATH, { signal });
        return payload;
    } catch (error) {
        if (error.name === 'AbortError' || (signal && signal.aborted)) {
            throw error;
        }
        throw new Error(error.message || 'Não foi possível carregar os dados da Equipe.', { cause: error });
    }
}
