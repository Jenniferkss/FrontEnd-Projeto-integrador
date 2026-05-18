import Header from '../../components/Header/Header';
import styles from './Contexto.module.css';
//import Footer from '../../components/Footer/Footer';

const Contexto = () => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.boxedLayout}>
                <Header />

                <main className={styles.hero}>
                    <h1>Contexto Historico (1955-1960) </h1>
                    <h3>Texto vai aqui</h3>
                </main>

            </div>
        </div>
    );
};


export default Contexto;
