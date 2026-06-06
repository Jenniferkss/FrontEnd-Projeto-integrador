import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Vestibular.module.css';
import { FaPlayCircle } from 'react-icons/fa';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';

export default function ObraVestibular() {
    const [dados, setDados] = useState(null);
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
                console.log('Dados recebidos com sucesso:', data);
                setDados(Array.isArray(data) ? data[0] : data);
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

    if (!dados) {
        return (
            <div style={{ textAlign: 'center', padding: '50px', fontSize: '18px' }}>
                {language === 'en'
                    ? 'No records found.'
                    : 'Nenhum registro encontrado ou erro na API.'}
            </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            <Header />

            <div className={styles.contentWrapper}>
                <header className={styles.mainHeader}>
                    <p className={styles.kicker}>
                        {language === 'en' ? 'Critical analysis' : 'ANÁLISE CRÍTICA'}
                    </p>

                    <h1 className={styles.headerTitle}>
                        {language === 'en' ? 'The work in Exam Prep' : 'A obra no vestibular'}
                    </h1>

                    <p className={styles.lead}>
                        {language === 'en'
                            ? 'Understand the literary work through interpretation, social criticism and essay themes.'
                            : 'Entenda a obra através de interpretações, crítica social e possíveis temas de redação.'}
                    </p>
                </header>

                {/* GRID SUPERIOR */}
                <section className={styles.topCardsGrid}>
                    <div className={`${styles.cardTop} ${styles.cardRedBorder}`}>
                        <h2 className={styles.cardTopTitle}>
                            {language === 'en' ? 'Critical Analysis' : 'Análise crítica'}
                        </h2>
                        <p className={styles.cardTopText}>
                            {dados.analiseCritica || 'Indisponível.'}
                        </p>
                    </div>

                    <div className={`${styles.cardTop} ${styles.cardRedBorder}`}>
                        <h2 className={styles.cardTopTitle}>
                            {language === 'en' ? 'Interpretations' : 'Interpretações e análises'}
                        </h2>
                        <p className={styles.cardTopText}>
                            {dados.interpretacoes || 'Indisponível.'}
                        </p>
                    </div>

                    <div className={`${styles.cardTop} ${styles.cardRedBorder}`}>
                        <h2 className={styles.cardTopTitle}>
                            {language === 'en' ? 'Essay Topics' : 'Possíveis temas para redação'}
                        </h2>

                        <ul className={styles.cardTopList}>
                            {Array.isArray(dados.temasRedacao) ? (
                                dados.temasRedacao.map((tema, index) => <li key={index}>{tema}</li>)
                            ) : (
                                <>
                                    <li>A invisibilidade social de populações marginalizadas.</li>
                                    <li>
                                        Os obstáculos para a garantia dos direitos humanos no
                                        Brasil.
                                    </li>
                                    <li>A exclusão social nas periferias urbanas.</li>
                                </>
                            )}
                        </ul>
                    </div>
                </section>

                {/* PARTE INFERIOR */}
                <div className={styles.mainLayout}>
                    <main className={styles.contentBox}>
                        <h2 className={styles.contentTitle}>
                            {dados.tituloPrincipal || 'A Dupla Perspectiva: Carolina vs. o Leitor'}
                        </h2>

                        <p className={styles.contentText}>
                            {dados.textoPrincipal || dados.resumo || 'Conteúdo indisponível.'}
                        </p>

                        {dados.citacao && (
                            <blockquote className={styles.quoteBlock}>
                                <div className={styles.quoteLine}></div>
                                <p className={styles.quoteText}>“{dados.citacao}”</p>
                            </blockquote>
                        )}

                        <h3 className={styles.vectorsTitle}>
                            {language === 'en'
                                ? 'Key Analytical Vectors'
                                : 'Vetores Analíticos Chave'}
                        </h3>

                        <div className={styles.vectorListContainer}>
                            {dados.contextoHist ? (
                                <p className={styles.contentText}>{dados.contextoHist}</p>
                            ) : (
                                <div className={styles.vectorListFallback}>
                                    <p>
                                        <strong>A Retórica da Sobrevivência:</strong> linguagem
                                        direta e crua sobre a fome e luta diária.
                                    </p>
                                    <p>
                                        <strong>Olhar Atento:</strong> percepção da desigualdade nas
                                        pequenas coisas do cotidiano.
                                    </p>
                                    <p>
                                        <strong>Rigidez Social:</strong> impacto do preconceito e
                                        estrutura social nas oportunidades.
                                    </p>
                                </div>
                            )}
                        </div>

                        {dados.personagens && (
                            <div>
                                <h3 className={styles.vectorsTitle}>
                                    {language === 'en'
                                        ? 'Main Characters'
                                        : 'Personagens Principais'}
                                </h3>
                                <p className={styles.contentText}>{dados.personagens}</p>
                            </div>
                        )}
                    </main>

                    {/* SIDEBAR */}
                    <div className={styles.sidebar}>
                        <div className={styles.videoBtnWrapper}>
                            <Link to="/videoAulas">
                                <button className={styles.videoBtn} > 
                                    <FaPlayCircle />
                                    {language === 'en'
                                        ? 'Watch video-classes'
                                        : 'Veja as vídeo-aulas'}
                                </button>
                            </Link>
                        </div>
                        

                        <div className={styles.statsCard}>
                            <h3 className={styles.statsTitle}>
                                {language === 'en'
                                    ? 'Exam Frequency'
                                    : 'Frequência nos vestibulares'}
                            </h3>

                            <div className={styles.progressGroup}>
                                {(
                                    dados.estatisticas || [
                                        { nome: 'Fuvest', porcentagem: 30 },
                                        { nome: 'Unicamp', porcentagem: 72 },
                                        { nome: 'ENEM', porcentagem: 42 },
                                    ]
                                ).map((est, index) => (
                                    <div key={index} className={styles.statsItem}>
                                        <div className={styles.progressLabels}>
                                            <p>{est.nome}</p>
                                            <p>{est.porcentagem}%</p>
                                        </div>

                                        <div className={styles.progressBg}>
                                            <div
                                                className={styles.progressBar}
                                                style={{
                                                    width: `${est.porcentagem}%`,
                                                }}
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
