import { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import styles from './Inicio.module.css'
import Footer from '../../components/Footer/Footer.jsx'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext.jsx';
import AuthorImg from '/images/foto-carolina.png';
import PaginaLivro from '/images/pagina-livro.png';


const Inicio = () => {
    const [dados, setDados] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { language, t } = useLanguage();


    useEffect(() => {

        const carregarDados = async () => {
            try {
                setLoading(true)
                setError(null)


                const res = await fetch(
                    'https://backend-projeto-integrador-rana.onrender.com/api/livro',
                    {
                        headers: {
                            'x-api-key': 'amods'
                        }
                    }
                )


                console.log("STATUS:", res.status)


                const json = await res.json()
                console.log("RESPOSTA:", json)


                if (!res.ok) {
                    throw new Error('Erro ao buscar livros')
                }


                if (!Array.isArray(json) || json.length === 0) {
                    throw new Error('Nenhum livro encontrado')
                }


                setDados(json[0])


            } catch (err) {
                console.log("ERRO COMPLETO:", err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }


        carregarDados()
    }, [])

    // Curiosidades


    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '80px' }}>
                Carregando...
            </div>
        )
    }


    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '80px', color: 'red' }}>
                {error}
            </div>
        )
    }


    if (!dados) {
        return (
            <div style={{ textAlign: 'center', padding: '80px' }}>
                Nenhum dado encontrado
            </div>
        )
    }


    return (
        <div className={styles.pageContainer}>
            <div className={styles.boxedLayout}>
                <Header />


                <main className={styles.hero}>
                    <h1 className={styles.title}>
                        {t('welcome_to')}
                    </h1>


                    <h1 className={styles.italicTitle}>
                        Intertexto!
                    </h1>


                    <p className={styles.description}>
                        {language === 'en'
                            ? 'On this site you will find analyses of classic Brazilian works, especially Child of the Dark: Diary of a Favela Woman by Carolina Maria de Jesus.'
                            : 'Neste site você terá acesso à análise das obras clássicas brasileiras, principalmente à obra Quarto de Despejo: Diário de Uma Favelada, de Carolina Maria de Jesus.'}
                    </p>


                    <div className={styles.btnGroup}>
                        <Link to="/Obra">
                            <button className={styles.btn}>Conheça Quarto de Despejo</button>
                        </Link>


                        <Link to="/Biblioteca">
                            <button className={styles.btn}>Conheça outras obras</button>
                        </Link>


                        <Link to="/Sobre">
                            <button className={styles.btn}>Conheça nossa equipe</button>
                        </Link>
                    </div>
                </main>
            </div>


            <section className={styles.contentSection}>
                <div className={styles.leftColumn}>
                    <div className={styles.badgeGroup}>
                        <div className={styles.badge}>{t('badge_social')}</div>
                        <div className={styles.badge}>{t('badge_resilience')}</div>
                    </div>
                    <h2 className={styles.bookTitle}> Livro: {dados.tituloPT}
                    </h2>


                    <p className={styles.textBody}>
                        {dados.descricaoPT}
                    </p>

                    <blockquote className={styles.quote}>
                        <div className={styles.quoteLine}></div>

                        <div>
                            <p>{t('quote_life_not_for_cowards')}</p>
                            <footer className={styles.quoteAuthor}>
                                {t('quote_author')}
                            </footer>
                        </div>
                    </blockquote>

                    <p className={styles.text}>
                        {t('author_life')}
                    </p>
                </div>


                <div className={styles.middleColumn}>
                    <div className={styles.imageCard}>
                        <img
                            src={dados.fotosCuriosidades?.[2]}
                            alt="Carolina Maria de Jesus"
                            className={styles.AuthorImg}
                        />
                    </div>


                    <div className={styles.infoBox}>{t('author_info')}</div>
                </div>


                <div className={styles.rightColumn}>
                    <div className={styles.bookPageCard}>
                        <img
                            src={dados.fotosCuriosidades?.[3]}
                            alt="Página do livro"
                            className={styles.pageImg}
                        />
                    </div>


                    <div className={styles.themeBox}>
                        <h3 className={styles.themeTitle}>{t('theme_title')}</h3>
                        <ul className={styles.themeList}>
                            <li>{t('theme_item1')}</li>
                            <li>{t('theme_item2')}</li>
                            <li>{t('theme_item3')}</li>
                        </ul>
                    </div>
                </div>
            </section>


            <Footer />
        </div>
    );
};


export default Inicio;