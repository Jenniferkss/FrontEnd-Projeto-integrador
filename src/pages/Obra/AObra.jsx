import { useState, useEffect } from 'react';

import styles from '../Obra/AObra.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import fieldsMap from '../../mapeamento/mapeamento';
import { request } from '../../services/api.js';

import carolina from '../../../public/images/carolina.png';
import livro from '../../../public/images/livro.png';

const frases = [
    {
        texto: 'A fome é a dinamite do corpo humano.',
        data: '15 de maio de 1958',
    },
    {
        texto: 'O Brasil precisa ser dirigido por uma pessoa que já passou fome.',
        data: '19 de julho de 1955',
    },
    {
        texto: 'Quem inventou a fome são os que comem.',
        data: '22 de maio de 1958',
    },
];

export default function ObraVestibular() {
    const [dados, setDados] = useState(null);
    const [carregando, setCarregando] = useState(true);

    const { language, t,  mapFields } = useLanguage();

    /* Frases */
    const [index, setIndex] = useState(0);

    const proxima = () => {
        setIndex((index + 1) % frases.length);
    };

    const anterior = () => {
        setIndex((index - 1 + frases.length) % frases.length);
    };

    useEffect(() => {
        const carregarLivros = async () => {
            try {
                const data = await request('/api/dicaVestibular', {
                    method: 'GET',
                    headers: {
                        'x-api-key': 'amods',
                    },
                });

                    console.debug('AObra - raw data from API:', data);
                    const processed = Array.isArray(data) ? data[0] : data;
                    console.debug('AObra - processed dados:', processed);
                        setDados(processed);
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
                    {t('loading_database')}
                </p>
            </div>
        );
    }

    if (!dados) {
        return (
            <div className={styles.loading}>
                <p>{t('no_records')}</p>
            </div>
        );
    }

    const localized = dados ? mapFields(dados, fieldsMap.obra) : {};

    return (
        <div className={styles.page}>
            <Header />

            <section className={styles.hero}>
                <div className={styles.leftHero}>
                    <div className={styles.quoteBox}>
                        <h1 className={styles.titleMain}>{t('title_part1')}</h1>
                        <h1 className={styles.redTitleMain}>{t('title_part2')}</h1>

                        <p className={styles.subtitle}>&nbsp;“{t('quote_brazil_needs')}”</p>

                        <p className={styles.subtitleAuthor}>{t('quote_author')}</p>
                    </div>
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
                    <img
                        src={livro}
                        alt="Livro Quarto de Despejo"
                        className={styles.bookCover}
                    />
                </div>

                <div className={styles.bookInfo}>
                    <p className={styles.sectionName}>{localized.sectionName || t('the_work')}</p>

                    <div className={styles.bookTitle}>
                        <h2>{localized.subtitle1 || t('a_story_that')}</h2>

                        <h2 className={styles.redTitle}>{localized.subtitle2 || t('changed_brazil')}</h2>
                    </div>

                    <div className={styles.cards}>
                        <div className={styles.card}>
                            <p>{t('publication')}</p>
                            <h3>{localized.publication || '1960'}</h3>
                        </div>

                        <div className={styles.card}>
                            <p>{t('languages')}</p>
                            <h3>{localized.languages || (language === 'en' ? '13 translations' : '13 traduções')}</h3>
                        </div>

                        <div className={styles.card}>
                            <p>{t('sales')}</p>
                            <h3>{localized.sales || (language === 'en' ? '1 million +' : '1 milhão +')}</h3>
                        </div>

                        <div className={styles.card}>
                            <p>{t('genre')}</p>
                            <h3>{localized.genre || (language === 'en' ? 'Diary / Autobiography' : 'Diário / Autobiografia')}</h3>
                        </div>
                    </div>

                    <div className={styles.textBox}>
                        {Array.isArray(localized.description) ? (
                            localized.description.map((texto, index) => <p key={index}>{texto}</p>)
                        ) : (
                            <>
                                <p>{localized.description || t('desc_p1')}</p>
                                <p>{t('desc_p2')}</p>
                                <p>{t('desc_p3')}</p>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* ANÁLISE */}
            <section className={styles.container}>
                <div className={styles.textContainer}>
                    <h2 className={styles.titleContainer}>{localized.titleAnalysis || t('analysis_of_work')}</h2>

                    <p>{localized.analysis || t('analysis_p1')}</p>
                </div>
            </section>

          <section className={`${styles.container} ${styles.textContainerTrechos}`}>
    <h2 className={styles.titleTrechos}>Trechos marcantes</h2>

    <h3 className={styles.subtitleTrechos}>palavras que ecoam</h3>

    <div className={styles.quoteIconTrechos}>❞</div>

    <p className={styles.fraseTrechos}>“{frases[index].texto}”</p>

    <time className={styles.dataTrechos}>{frases[index].data}</time>

    <div className={styles.controlsTrechos}>
        <button onClick={anterior} className={styles.btnTrechos}>
            &lt;
        </button>

        <div className={styles.dotsTrechos}>
            {frases.map((_, i) => (
                <strong
                    key={i}
                    className={i === index ? styles.activeDotTrechos : styles.dotTrechos}
                ></strong>
            ))}
        </div>

        <button onClick={proxima} className={styles.btnTrechos}>
            &gt;
        </button>
    </div>
</section>
            <Footer />
        </div>
    );
}
