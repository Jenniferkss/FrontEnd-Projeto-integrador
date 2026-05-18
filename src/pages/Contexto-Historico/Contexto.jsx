import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './Contexto.module.css';

const Contexto = () => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.boxedLayout}>
                <Header />

                <main className={styles.hero}>
                    <h1 className={styles.title}>
                        {'Contexto Histórico'} <br />
                        <span className={styles.italicTitle}>(1955-1960)</span>
                    </h1>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Contexto;