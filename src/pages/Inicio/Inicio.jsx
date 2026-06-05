import Header from '../../components/Header/Header';
import styles from './Inicio.module.css';
import { useLanguage } from '../../context/LanguageContext.jsx';
import AuthorImg from '/images/foto-carolina.png';
import PaginaLivro from '/images/pagina-livro.png';
import Footer from '../../components/Footer/Footer.jsx';
import { Link } from 'react-router-dom';
const Inicio = () => {
    const { language, t } = useLanguage();

    return (
        <div className={styles.pageContainer}>
            <div className={styles.boxedLayout}>
                <Header />

                <main className={styles.hero}>
                    <h1 className={styles.title}>
                        {t('welcome_to')} <br />
                        <span className={styles.italicTitle}>Intertexto!</span>
                    </h1>

                    <p className={styles.description}>
                        {language === 'en'
                            ? 'On this site you will find analyses of classic Brazilian works, especially Child of the Dark: Diary of a Favela Woman by Carolina Maria de Jesus.'
                            : 'Neste site você terá acesso à análise das obras clássicas brasileiras, principalmente à obra Quarto de Despejo: Diário de Uma Favelada, de Carolina Maria de Jesus.'}
                    </p>

                    <div className={styles.btnGroup}>

                        <Link to="/Obra" className={styles.logoGroup}>
                        <button className={styles.btn}>{language === 'en' ? 'Discover Child of the Dark' : 'Conheça Quarto de Despejo'}</button>
                        </Link>

                        <Link to="/Biblioteca" className={styles.logoGroup}>
                            <button className={styles.btn}>{language === 'en' ? 'Discover other works' : 'Conheça outras obras'}</button>
                        </Link>

                        <Link to="/Sobre" className={styles.logoGroup}>
                        <button className={styles.btn}>{language === 'en' ? 'Meet our team' : 'Conheça nossa equipe'}</button>
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

                    <h2 className={styles.bookTitle}>{t('book_title')}</h2>

                    <p className={styles.textBody}>{t('inicio_section_desc')}</p>

                    <blockquote className={styles.quote}>
                        <p className={styles.quote}>{t('quote_life_not_for_cowards')}</p>
                        <footer className={styles.quoteAuthor}>{t('quote_author')}</footer>
                    </blockquote>
                </div>

                <div className={styles.middleColumn}>
                    <div className={styles.imageCard}>
                        <img
                            src={AuthorImg}
                            alt="Carolina Maria de Jesus"
                            className={styles.AuthorImg}
                        />
                    </div>

                    <div className={styles.infoBox}>{t('author_info')}</div>
                </div>

                <div className={styles.rightColumn}>
                    <div className={styles.bookPageCard}>
                        <img src={PaginaLivro} alt="Página do livro" className={styles.pageImg} />
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
