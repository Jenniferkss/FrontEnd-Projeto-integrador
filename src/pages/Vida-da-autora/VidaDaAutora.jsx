import Header from "../../components/Header/Header";
import styles from "./VidaDaAutora.module.css";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";

export default function VidaAutora() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    const carregar = async () => {
      try {
        const response = await fetch(
          "https://backend-projeto-integrador-rana.onrender.com/api/curiosidade",
          {
            headers: {
              "x-api-key": "amods",
            },
          },
        );

        const data = await response.json();

        const lista = Array.isArray(data) ? data : data.data;

        setDados(lista || []);
      } catch (err) {
        console.error(err);
      }
    };

    carregar();
  }, []);

  const timeline = dados.slice(0, 5);
  const legado = dados.slice(5, 9);
  const frase = dados[dados.length - 1];

  return (
    <div className={styles.pageContainer}>
      <div className={styles.boxedLayout}>
        <Header />

        <main className={styles.hero}>
          <h1>Vida da autora</h1>

          <section className={styles.timeline}>
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`${styles.timelineItem} ${
                  index % 2 === 0 ? styles.left : styles.right
                }`}
              >
                <div className={styles.bola}></div>

                <div className={styles.timelineCard}>
                  <h3>{item.tituloPt}</h3>
                  <p>{item.conteudoPt}</p>
                </div>
              </div>
            ))}
          </section>

          <section className={styles.legado}>
            <h2>O legado de uma catadora de sonhos</h2>

            <div className={styles.cards}>
              {legado.map((item, index) => (
                <div key={index} className={styles.card}>
                  <h3>{item.tituloPt}</h3>
                  <p>{item.conteudoPt}</p>
                </div>
              ))}
            </div>
            {frase && (
              <blockquote className={styles.frase}>
                {frase.conteudoPt}
              </blockquote>
            )}
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}
