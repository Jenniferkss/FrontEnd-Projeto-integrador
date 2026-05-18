import Header from '../../components/Header/Header';
import styles from './Inicio.module.css';

const Inicio = () => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.boxedLayout}>
                <Header />

                <main className={styles.hero}>
                    <h1 className={styles.title}>
                        {' '}
                        Bem-Vindos ao <br />
                        <span className={styles.italicTitle}>Intertexto!</span>
                    </h1>

                    <p className={styles.description}>
                        Neste site você terá acesso à análise das obras clássicas brasileiras,
                        principalmente à obra
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
        </div>
    );
};

export default Inicio;
