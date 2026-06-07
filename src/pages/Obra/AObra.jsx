import {useState, useEffect} from 'react';
import styles from './Obra/AObra.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useLanguage } from '../../context/LanguageContext';
import fieldsMap from '../../mapeamento/mapeamento';
import {request} from '../../services/api.js';

export default function ObraVestibular() {
    const frases =[
        {
            texto: 'A fome é a dinamite do corpo humano',
            data: 'Página 45'
        },
        {
            texto: 'Outra frase marcante',
            data: 'Página 82'
        },
        {
            texto: 'Mais uma frase',
            data: 'Página 120'
        },
    ];
    const [dados, setDados] = useState(null);
    const [carregando, setCarregando] = useState(true);

    const {language, t, mapFields} = useLanguage();

    const [index, setIndex] = useState(0);

    const proxima = () => {
        setIndex ((index + 1) % frases.length);
    };

    const anterior = () => {
        setIndex((index -1 + frases.length) % frases.length);
    };

    useEffect(() => {
        const carregarLivros = async () => {
            try {
                const data = await request('/api/livro', {
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
           <p>{t('loading_database')}</p>
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
        < Header />

        <section className={styles.hero}>
            <div className={styles.leftHero}>
                <div className={styles.quoteBox}>
                    <h1 className={styles.titleMain}>{t('title_part1')}</h1>
                    <h1 className={styles.redtitleMain}>{t('title_part2')}</h1>

                <p className={styles.subtitle}>&nbsp;"{t('quote_brazil_needs')}"</p>

            <p className={styles.subtitleAuthor}>{t('quote_author')} </p>
                </div>
            </div>

        <div className={styles.rightHero}>
            <img 
            src={dados?.fotoAutor}
            alt={dados?.autor}
            className={styles.authorImage}
            />
        </div>
        </section>

         <section className={styles.aboutBook}>
                <div className={styles.bookImage}>
                    <img
                        src={dados?.capaURL}
                        alt={language === 'en' ? dados?.tituloEN : dados?.tituloPT}
                        className={styles.bookCover}
                    />
                </div>

                <div className={styles.bookInfo}>
                    <p className={styles.sectionName}>{localized.sectionName || t('the_work')}</p>

                    <div className={styles.bookTitle}>
                        <h2> 
                            {language === 'en'
                            ? dados?.tituloEN 
                            : dados?.tituloPT
                            }
                        </h2>
                    </div>

                    <div className={styles.cards}>
                        <div className={styles.card}>
                            <p>{t('publication')}</p>
                            <h3>{dados?.anoPublicacao}</h3>
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
                            <p>
                  {language === 'en'
                    ? dados?.generoEN
                    : dados?.generoPT}
                    </p>
                        </div>
                    </div>

                    <div className={styles.textBox}>
                     <p>
                      {language === 'en'
                      ? dados?.descricaoEN
                      : dados?.descricaoPT}
                    </p>
                    </div>
                </div>
            </section>

            <section className={styles.container}>
                <div className={styles.textContainer}>
                    <h2 className={styles.titleContainer}>{localized.titleAnalysis || t('analysis_of_work')}</h2>

                     <p>
                  {language === 'en'
                    ? dados?.analiseEN
                    : dados?.analisePT}
                    </p>
                </div>
            </section>

        <section className={styles.aboutBook}>
            <div className={styles.bookImage}>
                <img 
                src={dados?.capaURL}
                alt={language ==' en' ? dados?.tituloEN : dados?.tituloPT}
                className={styles.bookCover}
                />
            </div>

            <div className={styles.bookTitle}>
                <h2>
                    {language === 'en'
                    ? dados?.tituloEN
                    : dados?.tituloPT
                    }
                </h2>
            </div>

        <div className={styles.cards}>
            <div className={styles.cards}>
                <p>{t('publication')}</p>
                <h3>{dados?.anoPublicacao}</h3>
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
            <p>
    {language === 'en'
    ? dados?.generoEN
    : dados?.generoPT}
            </p>
    </div>
        </div>

<div className={styles.textBox}>
    <p> {language === 'en' 
    ?dados?.descricaoEN
    :dados?.descricaoPT}
    </p>
</div>
        </section>

    <section className={styles.container}>
        <div className={styles.textContainer}>
             <h2 className={styles.titleContainer}>{localized.titleAnalysis || t('analysis_of_work')}</h2>
        
    <p>
        {language === 'en'
        ? dados?.analiseEN
        : dados?.analisePT
        }
    </p>
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
        <Footer/>
    </div>
);
}