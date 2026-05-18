import styles from './Inicio.module.css';
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
                        <li><Link to="/obra">Obra</Link></li>
                        <li><Link to="/simulados">Simulado</Link></li>
                        <li><Link to="/sobre">Sobre</Link></li>
                        <li><Link to="/vestibular">Vestibular</Link></li>
                        <li><Link to="/curiosidades">Curiosidades</Link></li>
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
                <h1 className={styles.title}>
                    {' '}
                    Bem-Vindos ao <br />
                    <span className={styles.italicTitle}>Intertexto!</span>
                </h1>

                <p className={styles.description}>
                    Neste site você terá acesso à análise das obras clássicas brasileiras,
                    principalmente à obraa
                    <span className={styles.highlight}>
                        {''} Quarto de Despejo: Diário de Uma Favelada
                    </span>
                    , de
                    <span className={styles.highlight}> Carolina Maria de Jesus</span>
                </p>

                <div className={styles.btnGroup}>
                    <button className={styles.btn}>Conheça Quarto de Despejo</button>
                    <button className={styles.btn}>Conheça outras obras </button>
                    <button className={styles.btn}>Conheça nossa equipe</button>
                </div>
            </main>
        </div>
    );
};

export default Inicio
