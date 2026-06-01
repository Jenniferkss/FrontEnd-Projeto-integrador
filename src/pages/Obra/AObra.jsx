import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
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
                        <h2 className={styles.titleItalic}> Despejo</h2>
                    </div>

                    <div className={styles.quoteBox}>
                        <p className={styles.quote}>
                            {' '}
                            "O Brasil precisa ser dirigido por alguém que já passou fome"{' '}
                        </p>

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
                    <img src={livro} alt="Livro Quarto de Despejo" className={styles.bookCover} />
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
                            "Quarto de Despejo: Diário de uma Favelada" é o relato visceral e
                            poético de Carolina Maria de Jesus sobre a sua vida na favela do
                            Canindé, em São Paulo.
                        </p>

                        <p>
                            Escrito entre 1955 e 1960, o diário documenta com uma honestidade brutal
                            a fome, a miséria e a luta diária pela sobrevivência.
                        </p>

                        <p>
                            A obra se tornou um fenômeno editorial, traduzida para mais de 13
                            idiomas e reconhecida como um dos mais importantes testemunhos da
                            literatura brasileira.
                        </p>
                    </div>
                </div>
            </section>

            <section className={styles.container}>
                <div className={styles.textContainer}>
                    <h2 className={styles.titleContainer}>Análise da obra</h2>{' '}
                    <p>
                        A obra Quarto de Despejo, de Carolina Maria de Jesus, é um relato
                        autobiográfico em forma de diário que oferece uma visão direta e impactante
                        da vida na favela do Canindé, em São Paulo, na década de 1950. A grande
                        força do livro está na sua linguagem simples e espontânea, que aproxima o
                        leitor da realidade vivida pela autora, sem filtros ou idealizações. Um dos
                        aspectos mais marcantes da obra é a humanização da pobreza. Carolina não
                        apresenta apenas números ou estatísticas, mas experiências reais,
                        sentimentos, dores e pequenas alegrias do cotidiano. A fome, por exemplo,
                        aparece quase como um personagem constante, influenciando suas decisões, seu
                        humor e sua visão de mundo. A narrativa também funciona como uma denúncia
                        social poderosa. Ao relatar a falta de políticas públicas, o descaso das
                        autoridades e as condições desumanas da favela, a autora expõe a profunda
                        desigualdade existente na sociedade brasileira. Ao mesmo tempo, há uma
                        crítica implícita ao comportamento de alguns moradores e às dificuldades de
                        convivência em um ambiente de extrema escassez. Outro ponto importante é a
                        consciência crítica da autora. Mesmo com pouca escolaridade formal, Carolina
                        demonstra grande lucidez ao refletir sobre política, injustiça social e seu
                        próprio lugar no mundo. Sua escrita revela uma voz forte, que questiona e
                        resiste às condições impostas. Além disso, a obra destaca a força e a
                        dignidade da mulher negra, mostrando Carolina como mãe, trabalhadora e
                        escritora, que luta diariamente para sustentar seus filhos e manter sua
                        integridade. Por fim, Quarto de Despejo é mais do que um diário: é um
                        documento histórico e social que continua atual, pois muitos dos problemas
                        retratados ainda persistem. A obra convida o leitor a refletir sobre
                        desigualdade, empatia e responsabilidade social.
                    </p>
                </div>
            </section>
            <Footer />
        </div>
    );
}
