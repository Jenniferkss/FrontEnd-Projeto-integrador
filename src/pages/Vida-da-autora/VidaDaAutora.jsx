import Header from '../../components/Header/Header';
import styles from './VidaDaAutora.module.css';
import Footer from '../../components/Footer/Footer';

const VidaDaAutora = () => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.boxedLayout}>
                <Header />

                <main className={styles.hero}>
                    {/* O conteúdo sobre a vida da autora vai entrar aqui depois */}
                    <h1>Vida da Autora</h1>
                    <p>Conteúdo em desenvolvimento...</p>
                </main>

                <Footer />
            </div>
        </div>
    );
};

export default VidaDaAutora;
