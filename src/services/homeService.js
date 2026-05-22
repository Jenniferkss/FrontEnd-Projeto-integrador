import { request } from './api.js';

const HOME_PATH = '/api/integracao/home';

export async function fetchHome(signal) {
    try {
        const payload = await request(HOME_PATH, { signal });
        return payload;
    } catch (error) {
        if (error.name === 'AbortError' || (signal && signal.aborted)) {
            throw error;
        }
        throw new Error(error.message || 'Não foi possível carregar os dados da Home.', { cause: error });
    }
}
