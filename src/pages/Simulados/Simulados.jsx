import styles from './Simulados.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Inicio = () => {
    return (
        <div className={styles.page}>
            <Header />
            <main className={styles.hero}>
                <div className={styles.tituloDiv}>
                    <h1 className={styles.title}>Simulado</h1>
                </div>

                <div className={styles.falaJesus}>
                    <div className={styles.divTextoJesus}>
                        <p style={{ marginTop: 10, marginLeft: 30 }}>
                            “A fome é amarela. Quando estou com fome vejo tudo amarelo.” - Carolina
                            Maria de Jesus
                        </p>
                    </div>
                    <div className={styles.divTextoJesus}>
                        <p style={{ marginTop: 10, marginLeft: 30 }}>
                            A autora utiliza linguagem científica para descrever os efeitos
                            fisiológicos da fome, conferindo objetividade ao relato.
                        </p>
                    </div>
                </div>
                <div className={styles.enunciado}>
                    <p>
                        A frase acima sintetiza um dos procedimentos expressivos mais marcantes da
                        obra. Considerando o contexto do livro, assinale a alternativa que melhor
                        interpreta o efeito produzido por essa construção:
                    </p>
                </div>
                <div className={styles.divGrandeQuestoes}>
                    <div className={styles.questoes}>
                        <p>
                            (A) O uso da cor “amarela” constitui uma metáfora que traduz
                            sensorialmente a experiência da fome, revelando uma percepção subjetiva
                            e intensificada da realidade.
                        </p>
                    </div>
                    <div className={styles.questoes}>
                        (B) O uso da cor “amarela” constitui uma metáfora que traduz sensorialmente
                        a experiência da fome, revelando uma percepção subjetiva e intensificada da
                        realidade.
                    </div>
                    <div className={styles.questoes}>
                        (C) Trata-se de uma hipérbole que visa exagerar a condição da autora,
                        diminuindo o caráter documental da obra.
                    </div>
                    <div className={styles.questoes}>
                        (D) A construção indica alienação da narradora, que perde a capacidade de
                        distinguir realidade e imaginação.
                    </div>
                </div>
                <div className={styles.divBotao}>
                    <button className={styles.buttonVa}>
                        <h3>Voltar</h3>
                    </button>
                    <button className={styles.buttonVa}>
                        <h3>Avançar</h3>
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Inicio;