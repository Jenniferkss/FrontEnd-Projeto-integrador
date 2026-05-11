import styles from './Inicio.module.css';

const Inicio = () => {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className={styles.logoGroup}>
                    <svg className={styles.bookIcon}
                        viewBox='0 0 24 24'
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2">

                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                        <path d="M6.5 2H2Ov2OH6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.52z">
                        </path>
                    </svg>
                    <span className={styles.brand}>Intertexto</span>
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
                <h1 className={styles.title}> Bem-Vindos ao <br />
                    <span className={styles.italicTitle}>Intertexto!</span>
                </h1>

                <p className={styles.description}>
                    Neste site você terá acesso à análise das obras clássicas brasileiras, principalmente à obra
                    <span className={styles.highlight}>
                        {''} Quarto de Despejo: Diário de Uma Favelada
                    </span>
                    , de
                    <span className={styles.highlight}>
                        Carolina Maria de Jesus
                    </span>
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
