import Header from '../../components/Header/Header';
import carolina from '../../../public/images/carolina.png'
import livro from '../../../public/images/livro.png'

import styles from './AObra.module.css';

export default function AObra() {
    return (
        <div className={styles.page}>
            <Header />
            <section className={styles.hero}>
                <div className={styles.leftHero}>
                    <div className={styles.titleBox}>
                        <h2 className={styles.titleMain}> Quarto de </h2>
                        <h2 className={styles.titleItalic}> Desejo</h2>
                    </div>

                    <div className={styles.quoteBox}>
                        <p className={styles.quote}> "O Brasil precisa ser dirigido por alguém que já passou fome" </p>

                        <p className={styles.author}> - Carolina Maria de Jesus, 1960</p>

                    </div>
                </div>
                <div className={styles.rightHero}>
                    <img
                        src={carolina}
                        alt="Carolina Maria de Jesus"
                        className={styles.authorImage}
                    />
                </div>
            </section>

            <section className={styles.aboutBook}>
                <div className={styles.bookImage}>
                    <img src={livro} alt="Livro Quarto de Despejo" className={styles.bookCover}
                    />
                </div>
                <div className={styles.bookInfo}>
                    <p className={styles.sectionName}> A OBRA </p>

                    <div className={styles.bookTitle}>
                        <h2> Um relato que </h2>
                        <h2 className={styles.redTitle}> mudou o Brasil </h2>
                    </div>

                    <div className={styles.cards}>
                        <div className={styles.card}>
                            <p> Publicação </p>
                            <h3> 1960 </h3>
                        </div>
                        <div className={styles.card}>
                            <p> Idiomas </p>
                            <h3> 13 traduções </h3>
                        </div>
                        <div className={styles.card}>
                            <p> Vendas </p>
                            <h3> 1 milhão +</h3>
                        </div>
                        <div className={styles.card}>
                            <p> Gênero</p>
                            <h3> Diário /Autobiografia</h3>
                        </div>
                    </div>

                    <div className={styles.textBox}>
                        <p>
                            "Quarto de Despejo: Diário de uma Favelada" é o relato visceral e poético de Carolina Maria de Jesus sobre a sua vida na favela do Canindé, em São Paulo.
                        </p>

                        <p>
                            Escrito entre 1955 e 1960, o diário documenta com uma honestidade brutal a fome, a miséria e a luta diária pela sobrevivência.
                        </p>

                        <p>
                            A obra se tornou um fenômeno editorial, traduzida para mais de 13 idiomas e reconhecida como um dos mais importantes testemunhos da literatura brasileira.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
