import styles from './Inicio.module.css';

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

                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>

                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                    <h2 className={styles.brand}>Intertexto</h2>
                </div>

                <nav className={styles.nav}>
                    <ul className={styles.menu}>
                        <li>Inicio</li>
                        <li>Sobre</li>
                        <li>A obra</li>
                        <li>Vestibular</li>
                        <li>Simulados</li>
                        <li>Curiosidades</li>
                    </ul>
                </nav>

                <div className={styles.actions}>
                    <p className={styles.lang}>PT / EN </p>

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

            <main className={styles.author}>
                <h1 className={styles.title}> Bem-Vindos ao <h1/>
                <h1 className={styles.italicTitle}>Intertexto!</h1>
                </h1>

                <p className={styles.description}>
                    Neste site você terá acesso à análise das obras clássicas brasileiras,
                    principalmente à obra Quarto de Despejo de Carolina Maria de Jesus.
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
