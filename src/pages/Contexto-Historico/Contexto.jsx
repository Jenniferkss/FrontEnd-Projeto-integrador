import Header from '../../components/Header/Header';
import styles from './Contexto.module.css';
import Footer from '../../components/Footer/Footer';
import Card from '../../components/Card/Card';

const Contexto = () => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.boxedLayout}>
                <Header />

                <main className={styles.hero}>
                    <h2>Contexto Historico (1955-1960) </h2>
                    <p>Texto vai aqui</p>
                    <section className={styles.cardsContainer}>
                        <Card
                            titulo="O Brasil de JK"
                            descricao="Industrialização"
                        />

                        <Card
                            titulo="Favela de Canindé"
                            descricao="Pobreza urbana"
                        />

                        <Card
                            titulo="Impacto da obra"
                            descricao="Best seller mundial"
                        />
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
};


export default Contexto;
