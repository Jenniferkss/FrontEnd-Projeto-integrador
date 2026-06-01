import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import { request } from '../../services/api.js';
import styles from './video.module.css';

// ===== CONFIGURAÇÕES =====
const API_ENDPOINT = '/api/videoaula';

// ===== UTILITÁRIOS =====
const extractVideoId = (url) => {
    if (!url) return null;
    
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /youtube\.com\/shorts\/([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match?.[1]) return match[1];
    }
    return null;
};

const buildEmbedUrl = (url, startTime = 0) => {
    const videoId = extractVideoId(url);
    if (!videoId) return url;
    
    const baseUrl = `https://www.youtube.com/embed/${videoId}`;
    const params = new URLSearchParams();
    
    if (startTime > 0) params.append('start', startTime);
    params.append('rel', '0');
    params.append('modestbranding', '1');
    params.append('controls', '1');
    
    return `${baseUrl}?${params.toString()}`;
};

const truncateText = (value, maxLength = 180) => {
    const text = String(value || '').trim();
    if (!text) return '';
    return text.length > maxLength ? `${text.slice(0, maxLength).trimEnd()}...` : text;
};

// ===== COMPONENTE VIDEO CARD (Playlist Item) =====
function VideoCard({ video, isActive, onClick, index }) {
    const titulo = video.tituloPt || video.tituloEn || `Aula ${index + 1}`;
    const descricao = truncateText(video.descricaoPt || video.descricaoEn || '', 120);
    
    return (
        <button
            type="button"
            className={`${styles.playlistItem} ${isActive ? styles.active : ''}`}
            onClick={onClick}
            aria-current={isActive ? 'true' : undefined}
        >
            <div className={styles.itemNumber}>
                {isActive ? '▶' : String(index + 1).padStart(2, '0')}
            </div>
            <div className={styles.itemContent}>
                <h4 className={styles.itemTitle}>{titulo}</h4>
                {descricao && <p className={styles.itemDesc}>{descricao}</p>}
                {video.livroTitulo && (
                    <div className={styles.itemTag}>📚 {video.livroTitulo}</div>
                )}
            </div>
            <div className={styles.itemStatus}>
                {isActive && <div className={styles.playingDot}></div>}
            </div>
        </button>
    );
}

// ===== COMPONENTE VIDEO PLAYER =====
function VideoPlayer({ video, onLoad }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    
    if (!video) {
        return (
            <div className={styles.playerPlaceholder}>
                <div className={styles.placeholderIcon}>🎬</div>
                <p>Selecione uma aula para começar</p>
            </div>
        );
    }
    
    const embedUrl = buildEmbedUrl(video.urlMidia);
    
    return (
        <div className={styles.playerContainer}>
            <div className={styles.videoWrapper}>
                {!isLoaded && !hasError && (
                    <div className={styles.loadingOverlay}>
                        <div className={styles.spinner}></div>
                        <p>Carregando vídeo...</p>
                    </div>
                )}
                
                {hasError ? (
                    <div className={styles.errorOverlay}>
                        <p>⚠️ Não foi possível carregar o vídeo</p>
                        <button 
                            className={styles.retryBtn}
                            onClick={() => {
                                setHasError(false);
                                setIsLoaded(false);
                            }}
                        >
                            ↻ Tentar novamente
                        </button>
                    </div>
                ) : (
                    <iframe
                        src={embedUrl}
                        title={video.tituloPt || 'Video Aula'}
                        className={styles.videoFrame}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        onLoad={() => {
                            setIsLoaded(true);
                            onLoad?.();
                        }}
                        onError={() => setHasError(true)}
                    />
                )}
            </div>
            
            <div className={styles.videoInfo}>
                <div className={styles.videoBadge}>Aula em Destaque</div>
                <h2 className={styles.videoTitle}>{video.tituloPt || video.tituloEn}</h2>
                {(video.descricaoPt || video.descricaoEn) && (
                    <p className={styles.videoDescription}>
                        {video.descricaoPt || video.descricaoEn}
                    </p>
                )}
                {video.livroTitulo && (
                    <div className={styles.bookReference}>
                        <div>📖 Obra:</div>
                        <strong>{video.livroTitulo}</strong>
                    </div>
                )}
            </div>
        </div>
    );
}

// ===== COMPONENTE PRINCIPAL =====
export default function VideoAulas() {
    const [searchParams] = useSearchParams();
    const [videos, setVideos] = useState([]);
    const [videoAtivo, setVideoAtivo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filtroLivroId, setFiltroLivroId] = useState(
        searchParams.get('livroId') ? parseInt(searchParams.get('livroId'), 10) : null
    );

    useEffect(() => {
        let isActive = true;
        
        const carregarVideoAulas = async () => {
            setLoading(true);
            setError('');
            
            try {
                const params = new URLSearchParams();
                if (filtroLivroId) params.append('livroId', String(filtroLivroId));
                
                const data = await request(`${API_ENDPOINT}?${params.toString()}`);
                
                if (!isActive) return;
                
                const videosEnriquecidos = Array.isArray(data) ? data.map(video => ({
                    ...video,
                    livroTitulo: video.livro?.tituloPt || video.livro?.titulo || video.livroTitulo || null
                })) : [];
                
                setVideos(videosEnriquecidos);
                
                if (videosEnriquecidos.length > 0 && !videoAtivo) {
                    setVideoAtivo(videosEnriquecidos[0]);
                }
                
            } catch (err) {
                if (!isActive) return;
                console.error('Erro ao carregar videoaulas:', err);
                setError(err.message || 'Não foi possível carregar as videoaulas.');
                setVideos([]);
            } finally {
                if (isActive) setLoading(false);
            }
        };
        
        carregarVideoAulas();
        
        return () => { isActive = false; };
    }, [filtroLivroId]);

    const handleVideoSelect = (video) => {
        setVideoAtivo(video);
        if (window.innerWidth < 900) {
            document.getElementById('video-player-section')?.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    };

    const handleRetry = () => {
        setLoading(true);
        setError('');
        setFiltroLivroId(prev => prev);
    };

    const stats = useMemo(() => {
        const total = videos.length;
        const porLivro = filtroLivroId 
            ? videos.filter(v => v.livroId === filtroLivroId).length 
            : total;
        return { total, porLivro };
    }, [videos, filtroLivroId]);

    return (
        <div className={styles.page}>
            <Header />

            <main className={styles.shell}>
                {/* ===== HERO SECTION ===== */}
                <section className={styles.hero}>
                    <div className={styles.heroContent}>
                        <p className={styles.kicker}>Aprenda com especialistas</p>
                        <h1 className={styles.title}>
                            Vídeo Aulas
                        </h1>
                        <p className={styles.lead}>
                            Assista a análises aprofundadas das maiores obras da literatura brasileira.
                            Conteúdo produzido por especialistas, com foco em vestibulares e ENEM.
                        </p>
                    </div>

                    <div className={styles.heroPanel}>
                        <div className={styles.heroStat}>
                            <div className={styles.heroStatLabel}>Total</div>
                            <strong className={styles.heroStatValue}>{stats.total}</strong>
                        </div>
                        <div className={styles.heroStat}>
                            <div className={styles.heroStatLabel}>Disponíveis</div>
                            <strong className={styles.heroStatValue}>{stats.porLivro}</strong>
                        </div>
                        <div className={styles.heroStat}>
                            <div className={styles.heroStatLabel}>Obras</div>
                            <strong className={styles.heroStatValue}>
                                {new Set(videos.map(v => v.livroId).filter(Boolean)).size}
                            </strong>
                        </div>
                    </div>
                </section>

                {/* ===== TOOLBAR ===== */}
                <div className={styles.toolbar}>
                    <p className={styles.toolbarCopy}>
                        {loading
                            ? '🔍 Carregando videoaulas...'
                            : error
                                ? `⚠️ ${error}`
                                : `✓ ${stats.porLivro} videoaulas disponíveis`}
                    </p>

                    <div className={styles.toolbarActions}>
                        {filtroLivroId && (
                            <button
                                type="button"
                                className={styles.filterClearBtn}
                                onClick={() => setFiltroLivroId(null)}
                            >
                                ✕ Limpar filtro
                            </button>
                        )}
                        <button
                            type="button"
                            className={styles.retryButton}
                            onClick={handleRetry}
                            disabled={loading}
                        >
                            {loading ? '⏳...' : '↻ Atualizar'}
                        </button>
                    </div>
                </div>

                {/* ===== STATES ===== */}
                {loading && (
                    <section className={styles.loadingState} role="status" aria-live="polite">
                        <div className={styles.loadingSpinner}></div>
                        <div>
                            <strong>Carregando videoaulas...</strong>
                            <p>Preparamos o conteúdo para você assistir.</p>
                        </div>
                    </section>
                )}

                {error && !loading && (
                    <section className={styles.errorState} role="alert">
                        <p><strong>Ops!</strong> {error}</p>
                        <button onClick={handleRetry} className={styles.retryButton}>
                            ↻ Tentar novamente
                        </button>
                    </section>
                )}

                {!loading && !error && videos.length === 0 && (
                    <section className={styles.emptyState}>
                        <p><strong>Nenhuma videoaula encontrada.</strong></p>
                        <p>
                            {filtroLivroId 
                                ? 'Tente remover o filtro ou verificar outra obra.' 
                                : 'Novas aulas serão adicionadas em breve!'}
                        </p>
                        {filtroLivroId && (
                            <button 
                                onClick={() => setFiltroLivroId(null)} 
                                className={styles.retryButton}
                            >
                                Ver todas as aulas
                            </button>
                        )}
                    </section>
                )}

                {/* ===== CONTEÚDO PRINCIPAL ===== */}
                {!loading && !error && videos.length > 0 && (
                    <section className={styles.contentGrid} id="video-player-section">
                        <div className={styles.playerSection}>
                            <VideoPlayer 
                                video={videoAtivo} 
                                onLoad={() => console.log('Vídeo carregado')} 
                            />
                        </div>

                        <aside className={styles.playlistSection}>
                            <div className={styles.playlistHeader}>
                                <h3>Grade de Aulas</h3>
                                {filtroLivroId && (
                                    <div className={styles.playlistSub}>
                                        Filtrado por obra
                                    </div>
                                )}
                            </div>
                            
                            <div className={styles.playlistList} role="listbox">
                                {videos.map((video, index) => (
                                    <VideoCard
                                        key={video.id || index}
                                        video={video}
                                        index={index}
                                        isActive={videoAtivo?.id === video.id}
                                        onClick={() => handleVideoSelect(video)}
                                    />
                                ))}
                            </div>
                        </aside>
                    </section>
                )}

                {/* ===== MATERIAIS DE APOIO ===== */}
                {!loading && !error && videos.length > 0 && (
                    <section className={styles.supportSection}>
                        <h2 className={styles.sectionTitle}>Materiais de Apoio</h2>
                        <div className={styles.supportGrid}>
                            <article className={styles.supportCard}>
                                <div className={styles.cardBadge}>📄 PDF</div>
                                <h3>Roteiro de Estudos</h3>
                                <p>
                                    Guia estruturado com os pontos-chave de cada aula para revisão 
                                    eficiente antes das provas.
                                </p>
                                <button className={styles.cardAction}>
                                    Baixar Material →
                                </button>
                            </article>
                            
                            <article className={styles.supportCard}>
                                <div className={styles.cardBadge}>✍️ Exercícios</div>
                                <h3>Simulado Comentado</h3>
                                <p>
                                    Questões de vestibulares e ENEM sobre as obras, com 
                                    resolução detalhada pela equipe pedagógica.
                                </p>
                                <button className={styles.cardAction}>
                                    Abrir Caderno →
                                </button>
                            </article>
                        </div>
                    </section>
                )}

                {/* ===== DICAS DE ESTUDO ===== */}
                {!loading && !error && videos.length > 0 && (
                    <footer className={styles.studyFooter}>
                        <div className={styles.footerContent}>
                            <div className={styles.footerTips}>
                                <h3>💡 Dicas para Fixar o Conteúdo</h3>
                                <ul>
                                    <li><strong>Anote citações diretas:</strong> Frases marcantes da obra são ótimas para argumentos em redações.</li>
                                    <li><strong>Relacione com o contexto:</strong> Conecte os temas da obra com questões sociais atuais.</li>
                                    <li><strong>Revise em intervalos:</strong> Reassista trechos-chave 24h e 7 dias após a primeira aula.</li>
                                </ul>
                            </div>
                            <div className={styles.footerAlert}>
                                <h4>⚠️ Lembrete Importante</h4>
                                <p>
                                    Para provas, sempre correlacione a obra com seu movimento literário 
                                    e contexto histórico. Isso faz diferença na argumentação!
                                </p>
                            </div>
                        </div>
                    </footer>
                )}
            </main>

            <Footer />
        </div>
    );
}