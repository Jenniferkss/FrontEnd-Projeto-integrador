import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import { request } from '../../services/api.js';
import styles from './Biblioteca.module.css';

const API_KEY = import.meta.env.VITE_API_KEY ?? 'amods';

// Fallback local de capas para obras conhecidas
const CAPAS_FALLBACK = {
    'capitaes da areia': '/images/CapitaesDaAreia.webp',
    'capitães da areia': '/images/CapitaesDaAreia.webp',
};

// Normaliza texto (remove acentos) para comparar títulos
function normalizar(texto) {
    return String(texto || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

// Pega a capa: prioriza fallback local, depois campo da API, depois imagem padrão
function resolverCapa(livro) {
    const tituloNorm = normalizar(livro.titulo);
    if (tituloNorm.includes('capitaes da areia')) {
        return CAPAS_FALLBACK['capitães da areia'];
    }
    return livro.capa_url || '/images/livro.png';
}

// Extrai o nome do autor (pode vir como string, array ou objeto)
function nomeAutor(autor) {
    if (!autor) return 'Autor não informado';
    if (Array.isArray(autor)) return autor[0]?.nome || 'Autor não informado';
    if (typeof autor === 'object') return autor.nome || 'Autor não informado';
    return String(autor);
}

export default function Biblioteca() {
    const [livros, setLivros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState('');

    useEffect(() => {
        async function carregar() {
            try {
                const data = await request('/api/integracao/biblioteca', {
                    headers: { 'x-api-key': API_KEY },
                });

                // data: [{ id, livro, statusApi, conteudo: [{ titulo, autor, capa_url, ... }] }]
                const lista = (Array.isArray(data) ? data : [])
                    .filter((item) => item.statusApi === 'Online' && Array.isArray(item.conteudo))
                    .map((item) => {
                        const c = item.conteudo[0] || {};
                        const livro = {
                            id: item.id,
                            titulo: c.titulo || item.livro || 'Sem título',
                            autor: nomeAutor(c.autor),
                            capa: resolverCapa(c),
                        };
                        return livro;
                    });

                setLivros(lista);
            } catch (e) {
                console.error('Erro ao carregar biblioteca:', e);
                setErro('Não foi possível carregar a biblioteca.');
            } finally {
                setLoading(false);
            }
        }
        carregar();
    }, []);

    if (loading) {
        return (
            <div className={styles.page}>
                <Header />
                <div className={styles.loading}>Carregando biblioteca...</div>
                <Footer />
            </div>
        );
    }

    if (erro) {
        return (
            <div className={styles.page}>
                <Header />
                <div className={styles.loading}>{erro}</div>
                <Footer />
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <Header />

            <main className={styles.main}>
                <section className={styles.banner}>
                    <p className={styles.kicker}>Explore nossa coleção</p>
                    <h1 className={styles.titulo}>Biblioteca Integrada</h1>
                    <p className={styles.subtitulo}>
                        Obras de múltiplas fontes em um só lugar.
                    </p>
                </section>

                <section className={styles.grid}>
                    {livros.map((livro, index) => (
                        <Link
                            key={livro.id || index}
                            to={`/livro/${livro.id}`}
                            className={styles.card}
                        >
                            <div className={styles.capaWrap}>
                                <img
                                    src={livro.capa}
                                    alt={livro.titulo}
                                    className={styles.capa}
                                    loading="lazy"
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = '/images/livro.png';
                                    }}
                                />
                            </div>
                            <div className={styles.info}>
                                <h3 className={styles.nomeLivro}>{livro.titulo}</h3>
                                <p className={styles.nomeAutor}>{livro.autor}</p>
                            </div>
                        </Link>
                    ))}
                </section>
            </main>

            <Footer />
        </div>
    );
}
