import Header from '../../components/Header/Header';
import styles from './Sobre.module.css';

const Obra = () => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.boxedLayout}>
                <Header />

                <main className={styles.hero}>
                    <h1 className={styles.title}>
                        {' '}
                        Bem-Vindos ao <br />
                        <span className={styles.italicTitle}>Intertexto!</span>
                    </h1>
                </main>
            </div>
        </div>
    );
};

export default Obra;
