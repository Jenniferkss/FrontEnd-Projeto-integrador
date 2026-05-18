import styles from './Simulados.module.css';
import { Link } from 'react-router-dom';

const Inicio = () => {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className={styles.logoGroup}>
                    <svg
                        className={styles.bookIcon}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        {/* Lado esquerdo do livro */}
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        {/* Lado direito do livro */}
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                    <span className={styles.brand}>Intertexto</span>
                </div>

                <nav className={styles.nav}>
                    <ul className={styles.menu}>
                        <li>Inicio</li>
                        <li>Sobre</li>
                        <li>A obra</li>
                        <li>Vestibular</li>
                        <li>
                            <Link to="/simulados">Simulado</Link>
                        </li>
                        <li>Curiosidades</li>
                    </ul>
                </nav>

                <div className={styles.actions}>
                    <span className={styles.lang}>PT / EN</span>

                    <svg
                        className={styles.searchIcon}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </div>
            </header>

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
                <div className={styles.divGrandeQuestoes}>
                    <div className={styles.questoes}>
                        O uso da cor “amarela” constitui uma metáfora que traduz sensorialmente a
                        experiência da fome, revelando uma percepção subjetiva e intensificada da
                        realidade.
                    </div>
                    <div className={styles.questoesCerta}>
                        O uso da cor “amarela” constitui uma metáfora que traduz sensorialmente a
                        experiência da fome, revelando uma percepção subjetiva e intensificada da
                        realidade.
                    </div>
                    <div className={styles.questoes}>
                        Trata-se de uma hipérbole que visa exagerar a condição da autora, diminuindo
                        o caráter documental da obra.
                    </div>
                    <div className={styles.questoes}>
                        A construção indica alienação da narradora, que perde a capacidade de
                        distinguir realidade e imaginação.
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Inicio
