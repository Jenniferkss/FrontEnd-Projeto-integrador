import Header from "../../components/Header/Header";
import styles from "./Contexto.module.css";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";

export default function Contexto() {
  const [curiosidades, setCuriosidades] = useState([]);
  const [fotos, setFotos] = useState([]);
  const [fotoLivro, setFotoLivro] = useState([]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const response = await fetch(
          "https://backend-projeto-integrador-rana.onrender.com/api/curiosidade",
          {
            headers: {
              "x-api-key": "amods",
            },
          }
        );

        const data = await response.json();
        const lista = Array.isArray(data) ? data : data.data;
        setCuriosidades(lista || []);

        // CORRIGIDO AQUI: "fotoCuriosidades" mudou para "fotosCuriosidades"
        const responseFotos = await fetch(
          "https://backend-projeto-integrador-rana.onrender.com/api/livro/fotosCuriosidades",
          {
            headers: {
              "x-api-key": "amods",
            },
          }
        );

        const fotosData = await responseFotos.json();
        setFotos(Array.isArray(fotosData) ? fotosData : fotosData.data);

        const responseFotoLivro = await fetch(
          "https://backend-projeto-integrador-rana.onrender.com/api/livro/fotoLivro",
          {
            headers: {
              "x-api-key": "amods",
            },
          }
        );

        const fotoLivroData = await responseFotoLivro.json();
        setFotoLivro(
          Array.isArray(fotoLivroData)
            ? fotoLivroData
            : fotoLivroData.data
        );

      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    };

    carregarDados();
  }, []);

  const contextoHistorico = curiosidades.filter(
    (item) => item.id >= 19 && item.id <= 21
  );

  return (
    <div className={styles.pageContainer}>
      <div className={styles.boxedLayout}>
        <Header />

        <main className={styles.hero}>
          <h1>Contexto histórico (1955-1960)</h1>

          <section className={styles.cardsContainer}>
            {/* ADICIONADO O INDEX AQUI */}
            {contextoHistorico.map((item, index) => {
              
              // CORRIGIDO AQUI: Puxando a imagem pela posição (0, 1, 2) que mapeia as fotos de 1 a 3
              const imagem =
                fotoLivro?.[index]?.url ||
                fotos?.[index]?.url;

              return (
                <div key={item.id} className={styles.card}>
                  <h3 className={styles.cardTitle}>{item.tituloPt}</h3>

                  <div className={styles.imageBox}>
                    <img src={imagem} alt={item.tituloPt} />
                  </div>

                  <p className={styles.cardText}>{item.conteudoPt}</p>

                  <div className={styles.tag}>Curiosidade histórica</div>
                </div>
              );
            })}
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}