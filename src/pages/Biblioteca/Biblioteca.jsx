import { useEffect, useState } from 'react';

import Footer from '../../components/Footer/Footer.jsx';
import Header from '../../components/Header/Header.jsx';
import { request } from '../../services/api.js';
import styles from './Biblioteca.module.css';

const truncateText = (value, maxLength = 180) => {
    const text = String(value || '').trim();
    if (!text) return '';
    return text.length > maxLength ? `${text.slice(0, maxLength).trimEnd()}...` : text;
};

const getBookTitle = (livro, index) => {
    return (
        livro.tituloPT ||
        livro.tituloPt ||
        livro.tituloDoLivro ||
        livro.titulo ||
        `Livro ${index + 1}`
    );
};

const getBookAuthor = (livro) => {
    const primary = String(livro.autor || livro.autora || '').trim();
    if (primary && primary !== 'Autor não informado') return primary;

    const nested = String(livro.autores?.[0]?.nome || '').trim();
    return nested || 'Autor desconhecido';
};

const coverFieldNames = [
    'capaURL',
    'capaUrl',
    'capaURl',
    'capa_url',
    'capa',
    'cover',
    'image',
    'imageUrl',
    'imageURL',
    'url_capa',
    'urlCapa',
    'imagem',
    'imagemUrl',
    'imagemURL',
    'foto',
    'fotoUrl',
    'fotoURL',
    'foto_url',
    'urlImagem',
];

const extractCoverValue = (value) => {
    if (typeof value === 'string') {
        const text = value.trim();
        return text || '';
    }

    if (Array.isArray(value)) {
        for (const item of value) {
            const resolved = extractCoverValue(item);
            if (resolved) return resolved;
        }
        return '';
    }

    if (value && typeof value === 'object') {
        const candidateKeys = [
            'url',
            'src',
            'href',
            'link',
            'publicUrl',
            'thumbnail',
            'path',
            'value',
        ];

        for (const key of candidateKeys) {
            const resolved = extractCoverValue(value[key]);
            if (resolved) return resolved;
        }

        for (const nestedValue of Object.values(value)) {
            const resolved = extractCoverValue(nestedValue);
            if (resolved) return resolved;
        }
    }

    return '';
};

const getBookCoverUrl = (livro) => {
    for (const fieldName of coverFieldNames) {
        const coverUrl = extractCoverValue(livro?.[fieldName]);
        if (coverUrl) return coverUrl;
    }

    return '';
};

function BookCard({ livro, index }) {
    const titulo = getBookTitle(livro, index);
    const autor = getBookAuthor(livro);
    const descricao = truncateText(livro.descricaoPT || livro.descricao || 'Resumo não informado.');
    const capaUrl = getBookCoverUrl(livro);

    return (
        <article className={styles.bookCard}>
            <div className={styles.coverSection}>
                <div className={styles.coverFrame}>
                    {capaUrl ? (
                        <img
                            className={styles.coverImage}
                            src={capaUrl}
                            alt={titulo}
                            loading='lazy'
                        />
                    ) : (
                        <div className={styles.coverPlaceholder} aria-label={`Sem capa para ${titulo}`}>
                            <div className={styles.placeholderGlyph}>
                                {titulo.charAt(0).toUpperCase()}
                            </div>
                            <span className={styles.placeholderLabel}>Sem capa</span>
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.contentSection}>
                <div className={styles.bookHeader}>
                    <div className={styles.bookMetaRow}>
                        <span className={styles.bookYear}>
                            {livro.ano || livro.anoPublicacao || 'Ano não informado'}
                        </span>
                        <span className={styles.bookAuthor}>{autor}</span>
                    </div>

                    <h3 className={styles.bookTitle}>
                        {titulo}
                    </h3>
                </div>

                <div className={styles.synopsisGroup}>
                    <p className={styles.synopsisLabel}>Resumo</p>
                    <p className={styles.synopsisText}>{descricao}</p>
                </div>
            </div>
        </article>
    );
}

function FonteSection({ fonte, index }) {
    const livros = Array.isArray(fonte.conteudo) ? fonte.conteudo : [];
    const tituloFonte = fonte.livro || `Fonte ${index + 1}`;
    const statusOnline = String(fonte.statusApi || '').toLowerCase() === 'online';

    const statusStyles = statusOnline
        ? {
              background: 'linear-gradient(135deg, #156b38, #2f8f4e)',
              boxShadow: '0 14px 26px rgba(21, 107, 56, 0.3)',
              border: '1px solid rgba(92, 206, 124, 0.45)',
          }
        : {
              background: 'linear-gradient(135deg, #8d3c3c, #c03d2f)',
              boxShadow: '0 14px 26px rgba(160, 45, 45, 0.28)',
              border: '1px solid rgba(224, 116, 116, 0.42)',
          };

    return (
        <section className={styles.sourceCard}>
            <div className={styles.sourceHeader}>
                <div>
                    <p className={styles.sourceLabel}>Fonte {index + 1}</p>
                    <h2 className={styles.sourceTitle}>{tituloFonte}</h2>
                </div>
                <div className={styles.sourceStats}>
                    <div className={styles.statusBadge} style={statusStyles}>
                        {statusOnline ? 'Online' : 'Indisponível'}
                    </div>
                    <div className={styles.countBadge}>{livros.length} itens</div>
                </div>
            </div>

            {!statusOnline && (
                <p className={styles.sourceError}>
                    {fonte.erro || 'Fonte indisponível no momento.'}
                </p>
            )}

            {statusOnline && livros.length > 0 && (
                <div className={styles.booksGrid}>
                    {livros.map((livro, livroIndex) => (
                        <BookCard key={livroIndex} livro={livro} index={livroIndex} />
                    ))}
                </div>
            )}
        </section>
    );
}

export default function Biblioteca() {
    const [fontes, setFontes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [reloadToken, setReloadToken] = useState(0);

    const carregarBiblioteca = async () => {
        setLoading(true);
        setError('');

        try {
            const data = await request('/api/integracao/biblioteca');
            setFontes(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message || 'Não foi possível carregar a biblioteca.');
            setFontes([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarBiblioteca();
    }, [reloadToken]);

    const fontesOnline = fontes.filter(
        (f) => String(f.statusApi || '').toLowerCase() === 'online'
    ).length;
    const totalLivros = fontes.reduce(
        (acc, f) => acc + (Array.isArray(f.conteudo) ? f.conteudo.length : 0),
        0
    );

    return (
        <div className={styles.page}>
            <Header />

            <main className={styles.shell}>
                <section className={styles.hero}>
                    <div className={styles.heroContent}>
                        <h1 className={styles.title}>Biblioteca Integrada</h1>
                        <p className={styles.lead}>
                            As fontes chegam direto do agregador do backend, com leitura simples e
                            cartões mais claros.
                        </p>
                    </div>

                    <div className={styles.heroPanel}>
                        <div className={styles.heroStat}>
                            <span>Fontes</span>
                            <strong>{fontes.length}</strong>
                        </div>
                        <div className={styles.heroStat}>
                            <span>Online</span>
                            <strong>{fontesOnline}</strong>
                        </div>
                        <div className={styles.heroStat}>
                            <span>Livros</span>
                            <strong>{totalLivros}</strong>
                        </div>
                    </div>
                </section>

                <div className={styles.toolbar}>
                    <p className={styles.toolbarCopy}>
                        {loading
                            ? 'Buscando as fontes da biblioteca...'
                            : error
                              ? 'Não conseguimos carregar a biblioteca agora.'
                              : `Biblioteca pronta. ${fontesOnline} de ${fontes.length} fontes online.`}
                    </p>

                    <button
                        type='button'
                        className={styles.retryButton}
                        onClick={() => setReloadToken((prev) => prev + 1)}
                        disabled={loading}>
                        {loading ? 'Carregando...' : 'Tentar novamente'}
                    </button>
                </div>

                {/* Loading, Error e Empty States mantidos iguais ao que você gostava */}
                {loading && (
                    <section className={styles.loadingState}>Carregando biblioteca...</section>
                )}

                {error && (
                    <section className={styles.errorState}>
                        <p>{error}</p>
                        <button
                            onClick={() => setReloadToken((prev) => prev + 1)}
                            className={styles.retryButton}>
                            Tentar novamente
                        </button>
                    </section>
                )}

                {!loading && !error && fontes.length === 0 && (
                    <section className={styles.emptyState}>
                        <p>Nada disponível no momento.</p>
                    </section>
                )}

                {!loading && !error && fontes.length > 0 && (
                    <section className={styles.sourcesStack}>
                        {fontes.map((fonte, index) => (
                            <FonteSection key={index} fonte={fonte} index={index} />
                        ))}
                    </section>
                )}
            </main>

            <Footer />
        </div>
    );
}
