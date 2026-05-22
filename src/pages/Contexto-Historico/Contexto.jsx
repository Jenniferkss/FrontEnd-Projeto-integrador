import Header from '../../components/Header/Header';
import styles from './Contexto.module.css';
import Footer from '../../components/Footer/Footer';

const Contexto = () => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.boxedLayout}>
                <Header />

                <main className={styles.hero}>
                    <h2>Contexto Historico (1955-1960) </h2>
                    <p>Texto vai aqui</p>
                </main>

            </div>
            <Footer/>
        </div>
    );
};


export default Contexto;
