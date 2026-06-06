import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Vestibular.module.css';
import { FaPlayCircle } from 'react-icons/fa';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';

export default function ObraVestibular() {
    const [dados, setDados] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const { language } = useLanguage();

    useEffect(() => {
        const carregarLivros = async () => {
            try {
                const response = await fetch(
                    'https://backend-projeto-integrador-rana.onrender.com/api/dicaVestibular',
                    {
                        method: 'GET',
                        headers: {
                            'x-api-key': 'amods',
                            'Content-Type': 'application/json',
                        },
                    },
                );

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Erro retornado pelo servidor:', errorText);
                    throw new Error(`Erro ${response.status} ao buscar dados.`);
                }

                const data = await response.json();
                console.log('Dados recebidos com sucesso:', JSON.stringify(data, null, 2));
                
                // Garante que dados seja tratado como Array
                setDados(Array.isArray(data) ? data : [data]);
            } catch (error) {
                console.error('Erro ao conectar com o back-end:', error);
            } finally {
                setCarregando(false);
            }
        };

        carregarLivros();
    }, []);

    if (carregando) {
        return (
            <div style={{ textAlign: 'center', padding: '50px', fontSize: '18px' }}>
                {language === 'en' ? 'Loading database info...' : 'Carregando dados do banco...'}
            </div>
        );
    }

    if (!dados || dados.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '50px', fontSize: '18px' }}>
                {language === 'en'
                    ? 'No records found.'
                    : 'Nenhum registro encontrado ou erro na API.'}
            </div>
        );
    }

    // Pega o primeiro registro do banco
    const livro = dados[0];

    // Lógica para garantir que Interpretações tenha conteúdo caso a coluna mude de nome ou venha vazia
    // Lógica para garantir que Interpretações tenha conteúdo caso a coluna mude de nome ou venha vazia
const obterInterpretacao = () => {
    if (language === 'en') {
        // Removido o "|| livro?.conteudoEn"
        return livro?.interpretacoesEn || livro?.interpretacaoEn || 'No analysis available.';
    }
    // Removido o "|| livro?.conteudoPt"
    return livro?.interpretacoesPt || livro?.interpretacaoPt || 'Nenhuma análise disponível.';
};

    return (
        <div className={styles.pageContainer}>
            <Header />

            <div className={styles.contentWrapper}>
                <section className={styles.banner}>
                    <p className={styles.kicker}>Análise crítica</p>
                    <h1 className={styles.titulo}>A obra no vestibular</h1>
                    <p className={styles.subtitulo}>
                       Entenda a obra através de interpretações, crítica social e possíveis temas de redação. 
                    </p>
                </section>

                {/* GRID SUPERIOR */}
                <section className={styles.topCardsGrid}>
                    <div className={`${styles.cardTop} ${styles.cardRedBorder}`}>
                        <h2 className={styles.cardTopTitle}>
                            {language === 'en' ? 'Critical Analysis' : 'Análise crítica'}
                        </h2>
                        <p className={styles.cardTopText}>
                            {language === 'en' ? livro?.conteudoEn : livro?.conteudoPt}
                        </p>
                    </div>

                    <div className={`${styles.cardTop} ${styles.cardRedBorder}`}>
                        <h2 className={styles.cardTopTitle}>
                            {language === 'en' ? 'Interpretations' : 'Interpretações e análises'}
                        </h2>
                        <p className={styles.cardTopText}>
                            {obterInterpretacao()}
                        </p>
                    </div>

                    <div className={`${styles.cardTop} ${styles.cardRedBorder}`}>
                        <h2 className={styles.cardTopTitle}>
                            {language === 'en' ? 'Essay Topics' : 'Possíveis temas para redação'}
                        </h2>
                        <ul className={styles.cardTopList}>
                            {Array.isArray(livro?.temasRedacao) ? (
                                livro.temasRedacao.map((tema, index) => <li key={index}>{tema}</li>)
                            ) : livro?.temasRedacao ? (
                                livro.temasRedacao.split('\n').map((tema, index) => <li key={index}>{tema}</li>)
                            ) : (
                                <>
                                    <li>A invisibilidade social de populações marginalizadas.</li>
                                    <li>Os obstáculos para a garantia dos direitos humanos no Brasil.</li>
                                    <li>A exclusão social nas periferias urbanas.</li>
                                </>
                            )}
                        </ul>
                    </div>
                </section>

                {/* PARTE INFERIOR */}
                <div className={styles.mainLayout}>
                    <main className={styles.contentBox}>
                        
                        {/* Título e Texto Principal */}
                        <h2 className={styles.contentTitle}>
                            {livro?.tituloPrincipal || (language === 'en' ? 'The Double Perspective' : 'A Dupla Perspectiva: Carolina vs. o Leitor')}
                        </h2>
                        <p className={styles.contentText}>
                            {livro?.textoPrincipal || livro?.conteudoPt}
                        </p>

                        {/* Bloco de Citação Puro vindo do Banco */}
                        {livro?.citacao && (
                            <blockquote className={styles.quoteBlock}>
                                <div className={styles.quoteLine}></div>
                                <p className={styles.quoteText}>“{livro.citacao}”</p>
                            </blockquote>
                        )}

                        {/* Vetores Analíticos Chave */}
                        <h3 className={styles.vectorsTitle}>
                            {language === 'en' ? 'Key Analytical Vectors' : 'Vetores Analíticos Chave'}
                        </h3>

                        <div className={styles.vectorListContainer}>
                            {livro?.vetoresAnaliticos || livro?.contextoHist ? (
                                (livro.vetoresAnaliticos || livro.contextoHist).split('\n').map((linha, index) => {
                                    if (linha.includes(':')) {
                                        const [titulo, ...resto] = linha.split(':');
                                        return (
                                            <p key={index} className={styles.contentText}>
                                                <strong>{titulo.trim()}:</strong>{resto.join(':')}
                                            </p>
                                        );
                                    }
                                    return (
                                        <p key={index} className={styles.contentText}>
                                            {linha}
                                        </p>
                                    );
                                })
                            ) : (
                                // Fallback Completo
                                <div className={styles.vectorListFallback}>
                                    <p>
                                        <strong>A Retórica da Sobrevivência:</strong> Note como Carolina usa a linguagem crua e direta para descrever sua fome, trabalho e luta diária, validando a urgência de sua experiência.
                                    </p>
                                    <p>
                                        <strong>Olhar Atento:</strong> A famosa atenção aos detalhes da favela – desde os vizinhos até o lixo nas ruas – funciona como símbolo da percepção aguda de Carolina sobre a desigualdade e a injustiça social.
                                    </p>
                                    <p>
                                        <strong>Rigidez Social:</strong> A influência do preconceito racial e da estrutura social brasileira em moldar as oportunidades e a visão de mundo de Carolina, evidenciando as barreiras que cercam sua existência e a da comunidade ao seu redor.
                                    </p>
                                </div>
                            )}
                        </div>
                    </main>

                    {/* SIDEBAR */}
                    <div className={styles.sidebar}>
                        <div className={styles.videoBtnWrapper}>
                            <Link to="/VideoAulas">
                                <button className={styles.videoBtn}>
                                    <FaPlayCircle />
                                    {language === 'en' ? 'Watch video-classes' : 'Veja as vídeo-aulas'}
                                </button>
                            </Link>
                        </div>

                        <div className={styles.statsCard}>
                            <h3 className={styles.statsTitle}>
                                {language === 'en' ? 'Exam Frequency' : 'Frequência nos vestibulares'}
                            </h3>
                            <div className={styles.progressGroup}>
                                {(livro?.estatisticas || [
                                    { nome: 'Fuvest', porcentagem: 30 },
                                    { nome: 'Unicamp', porcentagem: 72 },
                                    { nome: 'ENEM', porcentagem: 42 },
                                ]).map((est, index) => (
                                    <div key={index} className={styles.statsItem}>
                                        <div className={styles.progressLabels}>
                                            <p>{est.nome}</p>
                                            <p>{est.porcentagem}%</p>
                                        </div>
                                        <div className={styles.progressBg}>
                                            <div
                                                className={styles.progressBar}
                                                style={{ width: `${est.porcentagem}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}