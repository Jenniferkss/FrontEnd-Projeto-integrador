import Header from '../../components/Header/Header';
import styles from './Inicio.module.css';
import AuthorImg from '../../assets/foto-carolina.png';
import PaginaLivro from '../../assets/pagina-livro.png';

const Inicio = () => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.boxedLayout}>
                <Header />

                <main className={styles.hero}>
                    <h1 className={styles.title}>
                        Bem-Vindos ao <br />
                        <span className={styles.italicTitle}>Intertexto!</span>
                    </h1>

                    <p className={styles.description}>
                        Neste site você terá acesso à análise das obras clássicas brasileiras,
                        principalmente à obra Quarto de Despejo: Diário de Uma Favelada, de Carolina Maria de Jesus.
                    </p>

                    <div className={styles.btnGroup}>
                        <button className={styles.btn}>Conheça Quarto de Despejo</button>
                        <button className={styles.btn}>Conheça outras obras</button>
                        <button className={styles.btn}>Conheça nossa equipe</button>
                    </div>
                </main>
            </div>

            <section className={styles.contentSection}>
                <div className={styles.leftColumn}>
                    <div className={styles.bagdeGroup}>
                        <div className={styles.bagde}>Critica Social</div>
                        <div className={styles.bagde}>Resiliência</div>
                    </div>

                    <h2 className={styles.bookTitle}>Livro: Quarto de despejo</h2>

                    <p className={styles.textBody}>
                        O livro é um testemunho real e impactante da miséria urbana no Brasil,
                        ao mesmo tempo em que revela a força, a dignidade e a esperança de uma
                        mulher que encontra na escrita uma forma de resistência.
                    </p>

                    <blockquote className={styles.quote}>
                        <p className={styles.quote}>"A vida não é para covardes"</p>
                        <footer className={styles.quoteAuthor}>- Carolina Maria de Jesus</footer>
                    </blockquote> 
                </div>

                <div className={styles.middleColumn}>
                    <div className={styles.imageCard}>
                        <img src={AuthorImg} alt="Carolina Maria de Jesus" className={styles.AuthorImg} />
                    </div>

                <div className={styles.infoBox}>
                    Carolina Maria de Jesus foi uma escritora brasileira, catadora de papel e
                    moradora de favela, que ficou famosa ao publicar Quarto de Despejo:
                    Diário de uma Favelada, onde relata a pobreza e a desigualdade social no Brasil.
                </div>
                </div>

                <div className={styles.rightColumn}>
                    <div className={styles.bookPageCard}>
                        <img src={PaginaLivro} alt="Página do livro" className={styles.pageImg} />
                    </div>

                    <div className={styles.themeBox}>
                        <h3 className={styles.themeTitle}>Tema essencial:</h3>
                        <ul className={styles.themeList}>
                            <li>Deslocamento Urbano</li>
                            <li>Pobreza Estrutural</li>
                            <li>Preconceito Racial</li>
                        </ul>
                    </div>
                </div>
            </section>
            </div>
    );
};

export default Inicio;