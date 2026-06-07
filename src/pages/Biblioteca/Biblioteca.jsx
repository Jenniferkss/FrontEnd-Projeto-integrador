import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import { request } from '../../services/api.js';
import { useLanguage } from '../../context/LanguageContext.jsx';

import styles from './Biblioteca.module.css';

const API_KEY = import.meta.env.VITE_API_KEY ?? 'amods';

// Fallback local de capas para obras conhecidas
const CAPAS_FALLBACK = {
    'capitaes da areia': '/images/CapitaesDaAreia.webp',
    'capitães da areia': '/images/CapitaesDaAreia.webp',
};

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
function nomeAutor(autor, language, selectField) {
    if (!autor) return language === 'en' ? 'Author not informed' : 'Autor não informado';
    if (Array.isArray(autor)) {
        const a = autor[0];
        if (!a) return language === 'en' ? 'Author not informed' : 'Autor não informado';
        if (typeof a === 'object') return selectField(a, 'nome') || a.nome || String(a);
        return String(a);
    }
    if (typeof autor === 'object') {
        return selectField(autor, 'nome') || autor.nome || (language === 'en' ? 'Author not informed' : 'Autor não informado');
    }
    return String(autor);
}

export default function Biblioteca() {
    const [livros, setLivros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState('');
    const { language, selectField } = useLanguage();

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
                            titulo: selectField(c, 'titulo') || c.titulo || item.livro || (language === 'en' ? 'Untitled' : 'Sem título'),
                            autor: nomeAutor(c.autor, language, selectField),
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
                <div className={styles.loading}>{language === 'en' ? 'Loading library...' : 'Carregando biblioteca...'}</div>
                <Footer />
            </div>
        );
    }

    if (erro) {
        return (
            <div className={styles.page}>
                <Header />
                <div className={styles.loading}>{language === 'en' ? 'Could not load library.' : erro}</div>
                <Footer />
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <Header />

            <main className={styles.main}>
                <section className={styles.banner}>
                    <p className={styles.kicker}>{language === 'en' ? 'Explore our collection' : 'Explore nossa coleção'}</p>
                    <h1 className={styles.titulo}>{language === 'en' ? 'Integrated Library' : 'Biblioteca Integrada'}</h1>
                    <p className={styles.subtitulo}>
                        {language === 'en' ? 'Works from multiple sources in one place.' : 'Obras de múltiplas fontes em um só lugar.'}
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
