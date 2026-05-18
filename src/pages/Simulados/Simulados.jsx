import Header from '../../components/Header/Header';
import styles from './Simulados.module.css';

const Inicio = () => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.boxedLayout}>
                <Header />

                <main className={styles.hero}>
                    <div className={styles.tituloDiv}>
                        <h1 className={styles.title}>Simulado</h1>
                    </div>

                    <div className={styles.falaJesus}>
                        <div className={styles.divTextoJesus}>
                            <p style={{ marginTop: 10, marginLeft: 30 }}>
                                “A fome é amarela. Quando estou com fome vejo tudo amarelo.” -
                                Carolina Maria de Jesus
                            </p>
                        </div>
                        <div className={styles.divTextoJesus}>
                            <p style={{ marginTop: 10, marginLeft: 30 }}>
                                A autora utiliza linguagem científica para descrever os efeitos
                                fisiológicos da fome, conferindo objetividade ao relato.
                            </p>
                        </div>
                    </div>

                    <div className={styles.divGrandeQuestoes}>
                        <div className={styles.questoes}>
                            O uso da cor “amarela” constitui uma metáfora que traduz sensorialmente
                            a experiência da fome, revelando uma percepção subjetiva e intensificada
                            da realidade.
                        </div>
                        <div className={styles.questoesCerta}>
                            O uso da cor “amarela” constitui uma metáfora que traduz sensorialmente
                            a experiência da fome, revelando uma percepção subjetiva e intensificada
                            da realidade.
                        </div>
                        <div className={styles.questoes}>
                            Trata-se de uma hipérbole que visa exagerar a condição da autora,
                            diminuindo o caráter documental da obra.
                        </div>
                        <div className={styles.questoes}>
                            A construção indica alienação da narradora, que perde a capacidade de
                            distinguir realidade e imaginação.
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Inicio;
