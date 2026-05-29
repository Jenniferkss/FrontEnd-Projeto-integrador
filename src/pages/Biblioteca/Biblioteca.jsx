import { useEffect, useState } from 'react';

import Footer from '../../components/Footer/Footer.jsx';
import Header from '../../components/Header/Header.jsx';
import styles from './Biblioteca.module.css';

const BIBLIOTECA_URL = 'https://backend-projeto-integrador-rana.onrender.com/api/integracao/biblioteca';

const truncateText = (value, maxLength = 180) => {
    const text = String(value || '').trim();

    if (!text) {
        return '';
    }

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
    const primaryAuthor = String(livro.autor || livro.autora || '').trim();

    if (primaryAuthor && primaryAuthor !== 'Autor não informado') {
        return primaryAuthor;
    }

    const nestedAuthor = String(livro.autores?.[0]?.nome || '').trim();

    if (nestedAuthor) {
        return nestedAuthor;
    }

    return 'Autor desconhecido';
};

const getCoverFrameStyle = (title) => {
    const isQuartoDeDespejo = String(title).toLowerCase().includes('despejo');

    return {
        height: isQuartoDeDespejo ? '126px' : '208px',
        minHeight: isQuartoDeDespejo ? '126px' : '208px',
        overflow: 'hidden',
        borderRadius: '22px 22px 0 0',
    };
};

const getCoverImageStyle = () => ({
    width: '100%',
    height: '100%',
    display: 'block',
    objectFit: 'cover',
    objectPosition: 'center center',
});

const getPlaceholderStyle = () => ({
    width: '100%',
    height: '100%',
    display: 'grid',
    placeItems: 'center',
    background: '#2f2f2f',
    color: '#d8d8d8',
    textAlign: 'center',
    padding: '1rem',
});

function BookCard({ livro, index }) {
    const titulo = getBookTitle(livro, index);
    const autor = getBookAuthor(livro);
    const descricao = truncateText(livro.descricaoPT || livro.descricao || 'Resumo não informado.');
    const capaUrl = livro.capaURl || livro.capaUrl || '';

    return (
        <article className={styles.bookCard}>
            <div className={styles.coverFrame} style={getCoverFrameStyle(titulo)}>
                {capaUrl ? (
                    <img
                        className={styles.coverImage}
                        src={capaUrl}
                        alt={titulo}
                        loading='lazy'
                        style={getCoverImageStyle()}
                    />
                ) : (
                    <div
                        className={styles.coverPlaceholder}
                        aria-label={`Sem capa para ${titulo}`}
                        style={getPlaceholderStyle()}>
                        <span
                            style={{
                                fontFamily: 'Montserrat, sans-serif',
                                fontSize: '0.95rem',
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                color: '#d8d8d8',
                                fontWeight: 700,
                            }}>
                            Sem capa disponível
                        </span>
                    </div>
                )}
            </div>

            <div className={styles.bookBody}>
                <div className={styles.bookMetaRow}>
                    <span className={styles.bookYear}>Livro {index + 1}</span>
                    <span className={styles.bookAuthor}>{autor}</span>
                </div>

                <h3
                    className={styles.bookTitle}
                    style={{ fontWeight: 800, fontSize: 'clamp(1.55rem, 2.6vw, 2rem)' }}>
                    {titulo}
                </h3>

                <div className={styles.synopsisGroup}>
                    <div>
                        <p className={styles.synopsisLabel}>Resumo</p>
                        <p className={styles.synopsisText}>{descricao}</p>
                    </div>
                </div>
            </div>
        </article>
    );
}

function FonteSection({ fonte, index }) {
    const livros = Array.isArray(fonte.conteudo) ? fonte.conteudo : [];
    const tituloFonte = fonte.livro || `Fonte ${index + 1}`;
    const statusOnline = String(fonte.statusApi || '').trim().toLowerCase() === 'online';
    const statusApi = statusOnline ? 'Online' : 'Indisponível';
    const statusStyles = statusOnline
        ? {
              background: 'linear-gradient(135deg, #0f7a3d, #1fb35e)',
              boxShadow: '0 16px 28px rgba(15, 122, 61, 0.34)',
              border: '1px solid rgba(151, 230, 178, 0.55)',
          }
        : {
              background: 'linear-gradient(135deg, #9f1d1d, #e53d34)',
              boxShadow: '0 16px 28px rgba(159, 29, 29, 0.32)',
              border: '1px solid rgba(239, 137, 137, 0.5)',
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
                        {statusApi}
                    </div>
                    <div className={styles.countBadge}>{livros.length} itens</div>
                </div>
            </div>

            {!statusOnline ? (
                <p className={styles.sourceError}>{fonte.erro || 'Fonte indisponível no momento.'}</p>
            ) : null}

            {statusOnline && livros.length > 0 ? (
                <div className={styles.booksGrid}>
                    {livros.map((livro, livroIndex) => (
                        <BookCard
                            key={`${tituloFonte}-${livroIndex}`}
                            livro={livro}
                            index={livroIndex}
                        />
                    ))}
                </div>
            ) : statusOnline ? (
                <div className={styles.sourceEmpty}>
                    <strong>Sem livros válidos nesta fonte.</strong>
                    <span>A resposta chegou, mas o campo de conteúdo veio vazio.</span>
                </div>
            ) : null}
        </section>
    );
}

export default function Biblioteca() {
    const [fontes, setFontes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const carregarBiblioteca = async (control = {}) => {
        const controller = control.signal ? null : new AbortController();
        const signal = control.signal || controller.signal;
        const abort = control.abort || (() => controller?.abort());
        const timeoutId = window.setTimeout(() => abort(), 10000);

        setLoading(true);
        setError('');

        try {
            const response = await fetch(BIBLIOTECA_URL, { signal });

            if (!response.ok) {
                throw new Error(`Erro ${response.status} ao buscar /api/integracao/biblioteca`);
            }

            const data = await response.json();

            if (!signal.aborted) {
                setFontes(Array.isArray(data) ? data : []);
            }
        } catch (fetchError) {
            if (fetchError.name === 'AbortError' || signal.aborted) {
                return;
            }

            setFontes([]);
            setError(fetchError.message || 'Não foi possível carregar a biblioteca.');
        } finally {
            window.clearTimeout(timeoutId);

            if (!signal.aborted) {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        const controller = new AbortController();

        carregarBiblioteca({
            signal: controller.signal,
            abort: () => controller.abort(),
        });

        return () => controller.abort();
    }, []);

    const fontesOnline = fontes.filter((fonte) => {
        const status = String(fonte.statusApi || '').toLowerCase();

        return !status.includes('indispon') && !status.includes('unavail');
    }).length;

    const totalLivros = fontes.reduce(
        (total, fonte) => total + (Array.isArray(fonte.conteudo) ? fonte.conteudo.length : 0),
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
                        onClick={() => carregarBiblioteca()}>
                        {loading ? 'Carregando...' : 'Tentar novamente'}
                    </button>
                </div>

                {loading ? (
                    <section className={styles.loadingState} aria-live='polite'>
                        <div className={styles.loadingSpinner} aria-hidden='true' />
                        <div>
                            <strong>Carregando biblioteca</strong>
                            <p>Aguardando a resposta do agregador central.</p>
                        </div>
                    </section>
                ) : error ? (
                    <section className={styles.errorState} role='alert'>
                        <div>
                            <p className={styles.errorLabel}>Falha no carregamento</p>
                            <h2>Não foi possível acessar a biblioteca agora.</h2>
                            <p>{error}</p>
                        </div>

                        <button
                            type='button'
                            className={styles.retryButton}
                            onClick={() => carregarBiblioteca()}>
                            Tentar novamente
                        </button>
                    </section>
                ) : null}

                {!loading && !error && fontes.length === 0 ? (
                    <section className={styles.emptyState}>
                        <p className={styles.emptyLabel}>Nada disponível</p>
                        <h2>O backend respondeu, mas não trouxe fontes no momento.</h2>
                        <p>Quando houver conteúdo, ele vai aparecer aqui separado por fonte.</p>
                    </section>
                ) : null}

                {!loading && !error && fontes.length > 0 ? (
                    <section className={styles.sourcesStack}>
                        {fontes.map((fonte, index) => (
                            <FonteSection
                                key={`${fonte.livro || 'fonte'}-${index}`}
                                fonte={fonte}
                                index={index}
                            />
                        ))}
                    </section>
                ) : null}
            </main>

            <Footer />
        </div>
    );
}
