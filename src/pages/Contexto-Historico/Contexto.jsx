import Header from '../../components/Header/Header';
import styles from './Contexto.module.css';
import Footer from '../../components/Footer/Footer';
import { useState, useEffect } from 'react';

export default function Contexto() {
    const [curiosidades, setCuriosidades] = useState([]);

    useEffect(() => {
        const carregarCuriosidades = async () => {
            try {
                const response = await fetch(
                    'https://backend-projeto-integrador-rana.onrender.com/api/curiosidades',
                    {
                        headers: {
                            'x-api-key': 'amods',
                        },
                    }
                );

                const data = await response.json();

                const lista = Array.isArray(data) ? data : data.data;

                setCuriosidades(lista || []);
            } catch (err) {
                console.error(err);
            }
        };

        carregarCuriosidades();
    }, []);

    return (
        <div className={styles.pageContainer}>
            <div className={styles.boxedLayout}>
                <Header />

                <main className={styles.hero}>
                    <h1>Contexto histórico (1955-1960)</h1>

                    <section className={styles.cardsContainer}>
                        {curiosidades.map((item) => (
                            <div key={item.id} className={styles.card}>
                                
                                {/* título estilo card */}
                                <h3 className={styles.cardTitle}>
                                    {item.tituloPt}
                                </h3>

                                {/* imagem fake (caso não tenha no banco ainda) */}
                                <div className={styles.imageBox}>
                                    <img
                                        src="https://via.placeholder.com/300x180"
                                        alt={item.tituloPt}
                                    />
                                </div>

                                {/* conteúdo */}
                                <p className={styles.cardText}>
                                    {item.conteudoPt}
                                </p>

                                {/* tag estilo da imagem */}
                                <div className={styles.tag}>
                                    Curiosidade histórica
                                </div>
                            </div>
                        ))}
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
}