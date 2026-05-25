import { useState, useEffect } from 'react';
import styles from '../Obra/AObra.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';

import carolina from '../../../public/images/carolina.png';
import livro from '../../../public/images/livro.png';

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
            <div className={styles.loading}>
                <p>
                    {language === 'en'
                        ? 'Loading database info...'
                        : 'Carregando dados do banco...'}
                </p>
            </div>
        );
    }

    if (!dados) {
        return (
            <div className={styles.loading}>
                <p>{language === 'en' ? 'No records found.' : 'Nenhum registro encontrado.'}</p>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <Header />

            <section className={styles.hero}>
                <div className={styles.leftHero}>
                    <div className={styles.titleBox}>
                        <h1 className={styles.titleMain}>
                            {language === 'en' ? 'Child of ' : 'Quarto de'}
                        </h1>
                        <h1 className={styles.redTitleMain}>
                            {language === 'en' ? 'the Dark' : 'Despejo'}
                        </h1>

                        <p className={styles.subtitle}>
                            {language === 'en'
                                ? ' “Brazil needs to be led by someone who has already experienced hunger.” '
                                : ' “O Brasil precisa ser dirigido por alguém que já passou fome” '}
                        </p>

                        <p className={styles.subtitleAuthor}>
                            {language === 'en'
                                ? ' - Carolina Maria de Jesus '
                                : ' - Carolina Maria de Jesus '}
                        </p>
                    </div>

                    {dados.citacao && (
                        <div className={styles.quoteBox}>
                            <blockquote className={styles.quote}>“{dados.citacao}”</blockquote>

                            <p className={styles.author}>Carolina Maria de Jesus</p>
                        </div>
                    )}
                </div>

                <div className={styles.rightHero}>
                    <img
                        src={carolina}
                        alt="Carolina Maria de Jesus"
                        className={styles.authorImage}
                    />
                </div>
            </section>


            <section className={styles.aboutBook}>
                <div className={styles.bookImage}>
                    <img src={livro} alt="Livro Quarto de Despejo" className={styles.bookCover} />
                </div>

                <div className={styles.bookInfo}>
                    <p className={styles.sectionName}>
                        {language === 'en' ? 'THE BOOK' : 'A OBRA'}
                    </p>

                    <div className={styles.bookTitle}>
                        <h2>{language === 'en' ? 'A report' : 'Um relato'}</h2>

                        <h2 className={styles.redTitle}>
                            {language === 'en' ? ' that changed the Brazil' : 'que mudou o Brasil'}
                        </h2>
                    </div>

                    <div className={styles.cards}>
                        {(
                            dados.estatisticas || [
                                {
                                    nome: 'Fuvest',
                                    porcentagem: 30,
                                },
                                {
                                    nome: 'Unicamp',
                                    porcentagem: 72,
                                },
                                {
                                    nome: 'ENEM',
                                    porcentagem: 42,
                                },
                            ]
                        ).map((est, index) => (
                            <div key={index} className={styles.card}>
                                <p>{est.nome}</p>

                                <h3>{est.porcentagem}%</h3>
                            </div>
                        ))}

                        <div className={styles.card}>
                            <p>{language === 'en' ? 'Genre' : 'Gênero'}</p>

                            <h3>
                                {language === 'en'
                                    ? 'Diary / Autobiography'
                                    : 'Diário / Autobiografia'}
                            </h3>
                        </div>
                    </div>

                    <div className={styles.textBox}>
                        <p>{dados.analiseCritica || 'Conteúdo indisponível.'}</p>

                        <p>{dados.interpretacoes || 'Conteúdo indisponível.'}</p>

                        <p>{dados.contextoHist || 'Conteúdo indisponível.'}</p>
                    </div>
                </div>
            </section>

            {/* ANÁLISE */}
            <section className={styles.container}>
                <div className={styles.textContainer}>
                    <h2 className={styles.titleContainer}>
                        {language === 'en' ? 'Work Analysis' : 'Análise da obra'}
                    </h2>

                    <p className={styles.analysisText}>
                        {dados.textoPrincipal || dados.resumo || 'Conteúdo indisponível.'}
                    </p>
                </div>
            </section>

            {/* TEMAS */}
            <section className={styles.container}>
                <div className={styles.textContainer}>
                    <h2 className={styles.titleContainer}>
                        {language === 'en' ? 'Essay Topics' : 'Possíveis temas de redação'}
                    </h2>

                    <div className={styles.redacaoList}>
                        {Array.isArray(dados.temasRedacao) ? (
                            dados.temasRedacao.map((tema, index) => (
                                <div key={index} className={styles.redacaoItem}>
                                    <p>{tema}</p>
                                </div>
                            ))
                        ) : (
                            <>
                                <div className={styles.redacaoItem}>
                                    <p>A invisibilidade social de populações marginalizadas.</p>
                                </div>

                                <div className={styles.redacaoItem}>
                                    <p>Os obstáculos para garantia dos direitos humanos.</p>
                                </div>

                                <div className={styles.redacaoItem}>
                                    <p>A exclusão social nas periferias urbanas.</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* PERSONAGENS */}
            {dados.personagens && (
                <section className={styles.container}>
                    <div className={styles.textContainer}>
                        <h2 className={styles.titleContainer}>
                            {language === 'en' ? 'Main Characters' : 'Personagens Principais'}
                        </h2>

                        <p className={styles.analysisText}>{dados.personagens}</p>
                    </div>
                </section>
            )}

            <Footer />
        </div>
    );
}
