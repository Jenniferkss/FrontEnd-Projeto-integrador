import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './Curiosidades.module.css';

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
                                <button link="/vida-da-autora">
                                    Vida da autora
                                </button>
                            </div>

                            {}
                            <div className={styles.card}>
                                <div className={styles.imageWrapper}>
                                    <img src="/images/curiosidade2.png" alt="Contexto histórico" />
                                </div>
                                <button link="/contexto-historico">
                                    Contexto histórico
                                </button>
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
