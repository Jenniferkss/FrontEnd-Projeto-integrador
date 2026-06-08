import Header from "../../components/Header/Header";
import styles from "./Contexto.module.css";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";

export default function Contexto() {
  const [curiosidades, setCuriosidades] = useState([]);
  const [fotos, setFotos] = useState([]);
  const [fotoLivro, setFotoLivro] = useState([]);

  useEffect(() => {
    const carregarCuriosidades = async () => {
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

        console.log("RESPOSTA API:", data);

        const lista = Array.isArray(data) ? data : data.data;

        console.log("LISTA:", lista);

        setCuriosidades(lista || []);
      } catch (err) {
        console.error(err);
      }
      const responseFotos = await fetch(
  "https://backend-projeto-integrador-rana.onrender.com/api/livro/fotoCuriosidades",
  {
    headers: {
      "x-api-key": "amods",
    },
  }
);

const fotosData = await responseFotos.json();
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

setFotos(Array.isArray(fotosData) ? fotosData : fotosData.data);
    };

    carregarCuriosidades();
  }, []);

  const contextoHistorico = curiosidades.filter(
    (item) => item.id >= 19 && item.id <= 21,
  );

  return (
    <div className={styles.pageContainer}>
      <div className={styles.boxedLayout}>
        <Header />

        <main className={styles.hero}>
          <h1>Contexto histórico (1955-1960)</h1>

          <section className={styles.cardsContainer}>
           {contextoHistorico.map((item, index) => (
              <div key={item.id} className={styles.card}>
                <h3 className={styles.cardTitle}>{item.tituloPt}</h3>

                <div className={styles.imageBox}>
            
                   <img
                        src={
                         index === 2
                         ? fotoLivro?.[0]?.url: 
                         fotos[index]?.url
  }
  alt={item.tituloPt}
/>
                </div>

                <p className={styles.cardText}>{item.conteudoPt}</p>

                <div className={styles.tag}>Curiosidade histórica</div>
              </div>
            ))}
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}
