import { useEffect, useState, useMemo } from 'react';
import Footer from '../../components/Footer/Footer.jsx';
import Header from '../../components/Header/Header.jsx';
import { request } from '../../services/api.js';
import styles from './Biblioteca.module.css';

// ===== CONFIGURAÇÕES =====
const CAPITAES_DA_AREIA_COVER_URL = '/images/capitaes-da-areia.jpg';
const DEFAULT_MAX_LENGTH = 320;
const EXPANDED_MAX_LENGTH = 2000;

// ===== UTILITÁRIOS =====
const truncateText = (value, maxLength = DEFAULT_MAX_LENGTH, showEllipsis = true) => {
    const text = String(value || '').trim();
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return showEllipsis ? `${text.slice(0, maxLength).trimEnd()}...` : text;
};

const formatYear = (year) => {
    if (!year || year === 'N/A' || year === 'Ano não informado') return null;
    const num = parseInt(year, 10);
    return (!isNaN(num) && num > 1000 && num <= new Date().getFullYear() + 10)
        ? String(num)
        : null;
};

// ===== RESOLUÇÃO DE TÍTULO =====
const getBookTitle = (livro, index) => {
    const candidates = [
        livro.tituloPT, livro.tituloPt, livro.titulo_pt,
        livro.tituloOriginal, livro.tituloDoLivro, livro.titulo,
        livro.name, livro.title, livro.nomeLivro, livro.obraPt, livro.obraPT
    ];
    return candidates.find(t => t && String(t).trim()) || `Livro ${index + 1}`;
};

// ===== RESOLUÇÃO DE AUTOR =====
const getBookAuthor = (livro) => {
    const candidates = [
        livro.autor, livro.autora, livro.author, livro.authors,
        livro.autores?.[0]?.nome, livro.autores?.[0]?.name,
        livro.autorNome, livro.escritor, livro.nomeAutor
    ];

    for (const candidate of candidates) {
        if (Array.isArray(candidate) && candidate[0]) {
            const first = candidate[0];
            const name = first.nome || first.name || first;
            if (name && String(name).trim() && String(name).toLowerCase() !== 'autor não informado') {
                return String(name).trim();
            }
        }
        if (candidate && String(candidate).trim() && String(candidate).toLowerCase() !== 'autor não informado') {
            return String(candidate).trim();
        }
    }
    return 'Autor desconhecido';
};

// ===== RESOLUÇÃO DE GÊNERO/CATEGORIA =====
const getBookGenre = (livro) => {
    const candidates = [
        livro.generoPT, livro.generoPt, livro.genero_pt,
        livro.genero, livro.genre, livro.genre_pt,
        livro.categoria, livro.category,
        livro.categorias?.[0], livro.tags?.[0], livro.tematica
    ];
    const found = candidates.find(g => g && String(g).trim());
    return found ? String(found).trim() : null;
};

// ===== RESOLUÇÃO DE EDITORA =====
const getBookPublisher = (livro) => {
    const candidates = [
        livro.editora, livro.editor, livro.publishing,
        livro.publicadora, livro.casaEditorial
    ];
    return candidates.find(p => p && String(p).trim()) || null;
};

// ===== RESOLUÇÃO DE IDIOMA =====
const getBookLanguage = (livro) => {
    const lang = livro.idioma || livro.language || livro.lingua;
    if (!lang) return null;
    const map = {
        'pt': 'Português', 'pt-br': 'Português (BR)', 'pt-pt': 'Português (PT)',
        'en': 'Inglês', 'es': 'Espanhol', 'fr': 'Francês'
    };
    return map[String(lang).toLowerCase()] || String(lang).trim();
};

// ===== RESOLUÇÃO DE PÁGINAS =====
const getBookPages = (livro) => {
    const pages = livro.paginas || livro.pages || livro.numPaginas;
    if (!pages) return null;
    const num = parseInt(pages, 10);
    return (!isNaN(num) && num > 0) ? `${num} páginas` : null;
};

// ===== RESOLUÇÃO DE CAPA (COM FALLBACK ESPECIAL) =====
const coverFieldNames = [
    'capaURL', 'capaUrl', 'capaURl', 'capa_url', 'capa',
    'cover', 'image', 'imageUrl', 'imageURL', 'img',
    'url_capa', 'urlCapa', 'imagem', 'imagemUrl', 'imagemURL',
    'foto', 'fotoUrl', 'fotoURL', 'foto_url', 'urlImagem',
    'thumbnail', 'thumb', 'poster'
];

const extractCoverValue = (value) => {
    if (typeof value === 'string') {
        const text = value.trim();
        return text.startsWith('http') || text.startsWith('/') ? text : '';
    }
    if (Array.isArray(value)) {
        for (const item of value) {
            const resolved = extractCoverValue(item);
            if (resolved) return resolved;
        }
        return '';
    }
    if (value && typeof value === 'object') {
        const candidateKeys = ['url', 'src', 'href', 'link', 'publicUrl', 'thumbnail', 'path', 'value', 'image'];
        for (const key of candidateKeys) {
            if (value[key] !== undefined) {
                const resolved = extractCoverValue(value[key]);
                if (resolved) return resolved;
            }
        }
        for (const nestedValue of Object.values(value)) {
            const resolved = extractCoverValue(nestedValue);
            if (resolved) return resolved;
        }
    }
    return '';
};

const getBookCoverUrl = (livro, titulo) => {
    const isCapitaesDaAreia = titulo?.toLowerCase().includes('capitães da areia') || 
                              titulo?.toLowerCase().includes('capitaes da areia');
    
    for (const fieldName of coverFieldNames) {
        if (livro?.[fieldName] !== undefined) {
            const coverUrl = extractCoverValue(livro[fieldName]);
            if (coverUrl) return coverUrl;
        }
    }
    if (livro?.imagens?.[0]) {
        const fallback = extractCoverValue(livro.imagens[0]);
        if (fallback) return fallback;
    }
    
    return isCapitaesDaAreia ? CAPITAES_DA_AREIA_COVER_URL : '';
};

// ===== RESOLUÇÃO DE DESCRIÇÃO =====
const getBookDescription = (livro) => {
    const candidates = [
        livro.descricaoPT, livro.descricaoPt, livro.descricao_pt,
        livro.descricao, livro.enredo_pt, livro.enredoPt, livro.enredoPT,
        livro.sinopse, livro.sinopsePT, livro.enredo,
        livro.resumo, livro.abstract, livro.description, livro.summary
    ];
    return candidates.find(d => d && String(d).trim()) || 'Resumo não informado.';
};

// ===== COMPONENTE BOOK CARD =====
function BookCard({ livro, index }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const titulo = useMemo(() => getBookTitle(livro, index), [livro, index]);
    const autor = useMemo(() => getBookAuthor(livro), [livro]);
    const genero = useMemo(() => getBookGenre(livro), [livro]);
    const ano = useMemo(() => formatYear(livro.ano || livro.anoPublicacao || livro.anoLancamento || livro.ano_publicacao), [livro]);
    const editora = useMemo(() => getBookPublisher(livro), [livro]);
    const idioma = useMemo(() => getBookLanguage(livro), [livro]);
    const paginas = useMemo(() => getBookPages(livro), [livro]);
    const descricaoCompleta = useMemo(() => getBookDescription(livro), [livro]);
    const descricao = useMemo(() => 
        truncateText(descricaoCompleta, isExpanded ? EXPANDED_MAX_LENGTH : DEFAULT_MAX_LENGTH, !isExpanded), 
        [descricaoCompleta, isExpanded]
    );
    const capaUrl = useMemo(() => getBookCoverUrl(livro, titulo), [livro, titulo]);

    const canExpand = descricaoCompleta.length > DEFAULT_MAX_LENGTH;

    const metaBadges = useMemo(() => {
        const badges = [];
        if (ano) badges.push({ label: ano, icon: '📅', type: 'year' });
        if (autor) badges.push({ label: autor, icon: '✍️', type: 'author' });
        if (genero) badges.push({ label: genero, icon: '📚', type: 'genre' });
        if (editora) badges.push({ label: editora, icon: '🏢', type: 'publisher' });
        if (idioma) badges.push({ label: idioma, icon: '🌐', type: 'language' });
        if (paginas) badges.push({ label: paginas, icon: '📄', type: 'pages' });
        return badges;
    }, [ano, autor, genero, editora, idioma, paginas]);

    return (
        <article className={styles.bookCard}>
            <div className={styles.coverSection}>
                <div className={styles.coverFrame}>
                    {capaUrl ? (
                        <img
                            className={styles.coverImage}
                            src={capaUrl}
                            alt={`Capa do livro ${titulo}`}
                            loading="lazy"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement.classList.add(styles.coverPlaceholder);
                            }}
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
                    {metaBadges.length > 0 && (
                        <div className={styles.bookMetaRow}>
                            {metaBadges.map((badge, i) => (
                                <span 
                                    key={i} 
                                    className={`${styles.metaBadge} ${styles[`metaBadge${badge.type.charAt(0).toUpperCase() + badge.type.slice(1)}`]}`}
                                >
                                    <span className={styles.metaBadgeIcon}>{badge.icon}</span>
                                    <span>{badge.label}</span>
                                </span>
                            ))}
                        </div>
                    )}

                    <h3 className={styles.bookTitle} title={titulo}>
                        {titulo}
                    </h3>
                </div>

                <div className={styles.synopsisGroup}>
                    <p className={styles.synopsisLabel}>Sobre a obra</p>
                    <p className={styles.synopsisText} id={`synopsis-${index}`}>
                        {descricao}
                    </p>
                    {canExpand && (
                        <button
                            type="button"
                            className={styles.expandButton}
                            onClick={() => setIsExpanded(prev => !prev)}
                            aria-expanded={isExpanded}
                            aria-controls={`synopsis-${index}`}
                        >
                            <span className={styles.expandIcon}>{isExpanded ? '▲' : '▼'}</span>
                            {isExpanded ? 'Ver menos' : 'Ler mais'}
                        </button>
                    )}
                </div>
            </div>
        </article>
    );
}

// ===== COMPONENTE FONTE SECTION =====
function FonteSection({ fonte, index }) {
    const livros = useMemo(() => Array.isArray(fonte.conteudo) ? fonte.conteudo : [], [fonte]);
    const tituloFonte = useMemo(() => fonte.livro || fonte.nome || fonte.source || `Fonte ${index + 1}`, [fonte, index]);
    const statusOnline = useMemo(() => String(fonte.statusApi || fonte.status || '').toLowerCase() === 'online', [fonte]);

    return (
        <section className={styles.sourceCard}>
            <div className={styles.sourceHeader}>
                <div className={styles.sourceHeaderLeft}>
                    <p className={styles.sourceLabel}>Fonte {index + 1}</p>
                    <h2 className={styles.sourceTitle}>{tituloFonte}</h2>
                </div>
                <div className={styles.sourceStats}>
                    <div className={`${styles.statusBadge} ${statusOnline ? styles.statusOnline : styles.statusOffline}`}>
                        <span className={styles.statusDot}></span>
                        {statusOnline ? 'Online' : 'Indisponível'}
                    </div>
                    <div className={styles.countBadge}>
                        {livros.length} {livros.length === 1 ? 'item' : 'itens'}
                    </div>
                </div>
            </div>

            {!statusOnline && (
                <p className={styles.sourceError}>
                    {fonte.erro || fonte.errorMessage || 'Fonte indisponível no momento. Tente recarregar.'}
                </p>
            )}

            {statusOnline && livros.length > 0 && (
                <div className={styles.booksGrid}>
                    {livros.map((livro, livroIndex) => (
                        <BookCard key={`${index}-${livroIndex}`} livro={livro} index={livroIndex} />
                    ))}
                </div>
            )}

            {statusOnline && livros.length === 0 && (
                <p className={styles.sourceEmpty}>Nenhum livro encontrado nesta fonte.</p>
            )}
        </section>
    );
}

// ===== COMPONENTE PRINCIPAL =====
export default function Biblioteca() {
    const [fontes, setFontes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [reloadToken, setReloadToken] = useState(0);

    // ✅ useEffect corrigido - abordagem React 18+
    useEffect(() => {
        const carregarBiblioteca = async () => {
            setLoading(true);
            setError('');
            try {
                const data = await request('/api/integracao/biblioteca');
                setFontes(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error('Erro ao carregar biblioteca:', err);
                setError(err.message || 'Não foi possível carregar a biblioteca. Verifique sua conexão.');
                setFontes([]);
            } finally {
                setLoading(false);
            }
        };

        carregarBiblioteca();
    }, [reloadToken]);

    const fontesOnline = useMemo(() =>
        fontes.filter(f => String(f.statusApi || f.status || '').toLowerCase() === 'online').length,
        [fontes]
    );

    const totalLivros = useMemo(() =>
        fontes.reduce((acc, f) => acc + (Array.isArray(f.conteudo) ? f.conteudo.length : 0), 0),
        [fontes]
    );

    return (
        <div className={styles.page}>
            <Header />

            <main className={styles.shell}>
                <section className={styles.hero}>
                    <div className={styles.heroContent}>
                        <p className={styles.kicker}>Explore nossa coleção</p>
                        <h1 className={styles.title}>Biblioteca Integrada</h1>
                        <p className={styles.lead}>
                            Acesse obras de múltiplas fontes em um só lugar.
                            Cada card exibe informações completas: capa, título, autor, ano, gênero,
                            editora e resumo detalhado.
                        </p>
                    </div>

                    <div className={styles.heroPanel}>
                        <div className={styles.heroStat}>
                            <span className={styles.heroStatLabel}>Fontes</span>
                            <strong className={styles.heroStatValue}>{fontes.length}</strong>
                        </div>
                        <div className={styles.heroStat}>
                            <span className={styles.heroStatLabel}>Online</span>
                            <strong className={styles.heroStatValue}>{fontesOnline}</strong>
                        </div>
                        <div className={styles.heroStat}>
                            <span className={styles.heroStatLabel}>Livros</span>
                            <strong className={styles.heroStatValue}>{totalLivros}</strong>
                        </div>
                    </div>
                </section>

                <div className={styles.toolbar}>
                    <p className={styles.toolbarCopy}>
                        {loading
                            ? '🔍 Buscando fontes na biblioteca...'
                            : error
                                ? `⚠️ ${error}`
                                : `✓ ${fontesOnline} de ${fontes.length} fontes online • ${totalLivros} livros disponíveis`}
                    </p>

                    <button
                        type="button"
                        className={styles.retryButton}
                        onClick={() => setReloadToken(prev => prev + 1)}
                        disabled={loading}
                        aria-label={loading ? 'Carregando' : 'Recarregar biblioteca'}
                    >
                        {loading ? '⏳ Carregando...' : '↻ Recarregar'}
                    </button>
                </div>

                {loading && (
                    <section className={styles.loadingState} role="status" aria-live="polite">
                        <div className={styles.loadingSpinner}></div>
                        <div>
                            <strong>Carregando biblioteca...</strong>
                            <p>Buscamos as fontes e organizamos as obras para você.</p>
                        </div>
                    </section>
                )}

                {error && !loading && (
                    <section className={styles.errorState} role="alert">
                        <p><strong>Ops!</strong> {error}</p>
                        <button
                            onClick={() => setReloadToken(prev => prev + 1)}
                            className={styles.retryButton}
                        >
                            ↻ Tentar novamente
                        </button>
                    </section>
                )}

                {!loading && !error && fontes.length === 0 && (
                    <section className={styles.emptyState}>
                        <p><strong>Nada por aqui ainda.</strong></p>
                        <p>As fontes podem estar em manutenção ou sem conteúdo disponível.</p>
                        <button
                            onClick={() => setReloadToken(prev => prev + 1)}
                            className={styles.retryButton}
                        >
                            ↻ Verificar novamente
                        </button>
                    </section>
                )}

                {!loading && !error && fontes.length > 0 && fontesOnline === 0 && (
                    <section className={styles.emptyState}>
                        <p><strong>Todas as fontes estão indisponíveis.</strong></p>
                        <p>Verifique sua conexão ou tente mais tarde.</p>
                        <button
                            onClick={() => setReloadToken(prev => prev + 1)}
                            className={styles.retryButton}
                        >
                            ↻ Tentar reconectar
                        </button>
                    </section>
                )}

                {!loading && !error && fontesOnline > 0 && (
                    <section className={styles.sourcesStack}>
                        {fontes.map((fonte, index) => (
                            <FonteSection key={fonte.id || index} fonte={fonte} index={index} />
                        ))}
                    </section>
                )}
            </main>

            <Footer />
        </div>
    );
}