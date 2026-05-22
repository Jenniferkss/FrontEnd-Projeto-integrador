const DEFAULT_API_BASE_URL = 'https://backend-projeto-integrador-rana.onrender.com';

const normalizeBaseUrl = (value) => String(value || DEFAULT_API_BASE_URL).replace(/\/+$/, '');

const runtimeDefaultBaseUrl = import.meta.env.DEV ? '/api' : DEFAULT_API_BASE_URL;

export const API_BASE_URL = normalizeBaseUrl(
    import.meta.env.VITE_API_BASE_URL ?? runtimeDefaultBaseUrl
);

const buildUrl = (path) => {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    if (API_BASE_URL.endsWith('/api') && normalizedPath.startsWith('/api/')) {
        return `${API_BASE_URL}${normalizedPath.slice(4)}`;
    }

    return `${API_BASE_URL}${normalizedPath}`;
};

const readResponseBody = async (response) => {
    if (response.status === 204) {
        return null;
    }

    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
        try {
            return await response.json();
        } catch {
            return null;
        }
    }

    try {
        return await response.text();
    } catch {
        return null;
    }
};

const resolveErrorMessage = (payload, response, path) => {
    if (typeof payload === 'string' && payload.trim()) {
        return payload.trim();
    }

    if (payload && typeof payload === 'object') {
        return (
            payload.error ||
            payload.message ||
            payload.detail ||
            `Erro ${response.status} ao buscar ${path}`
        );
    }

    return `Erro ${response.status} ao buscar ${path}`;
};

export async function request(path, options = {}) {
    const headers = { ...(options.headers || {}) };
    let body = options.body;

    if (body !== undefined && !(body instanceof FormData) && !headers['Content-Type']) {
        headers['Content-Type'] = 'application/json';
    }

    if (
        body !== undefined &&
        body !== null &&
        !(body instanceof FormData) &&
        !(body instanceof Blob) &&
        typeof body === 'object' &&
        headers['Content-Type'] === 'application/json'
    ) {
        body = JSON.stringify(body);
    }

    const response = await fetch(buildUrl(path), {
        ...options,
        body,
        headers,
    });

    const payload = await readResponseBody(response);

    if (!response.ok) {
        throw new Error(resolveErrorMessage(payload, response, path));
    }

    return payload;
}
