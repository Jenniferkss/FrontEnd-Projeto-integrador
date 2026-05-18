import Header from '../../components/Header/Header';
import styles from './Curiosidades.module.css';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
const Curiosidades = () => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.boxedLayout}>
                <Header />

                <main className={styles.hero}>
                    <h1 className={styles.title}>
                        {'Curiosidades'} <br />
                        <span className={styles.italicTitle}>clique e conheça:</span>
                    </h1>
                    <div className={styles.cardsContainer}>
                        <div className={styles.cardsContainer}>
                            {}
                            <div className={styles.card}>
                                <div className={styles.imageWrapper}>
                                    <img src="/images/curiosidade1.png" alt="Vida da autora" />
                                </div>
                                    <Link
                                        to="/curiosidades/VidaDaAutora"
                                        className={styles.cardButton}>
                                        Vida da autora
                                    </Link>

                            </div>

                            {}
                            <div className={styles.card}>
                                <div className={styles.imageWrapper}>
                                    <img src="/images/curiosidade2.png" alt="Contexto histórico" />
                                </div>

                                <Link
                                    to="/curiosidades/contexto-historico"
                                    className={styles.cardButton}>
                                    Contexto histórico
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Curiosidades;
