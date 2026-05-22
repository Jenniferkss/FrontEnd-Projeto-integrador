import styles from './Sobre.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useEffect, useState } from 'react';

export default function Inicio() {
    const [ setLivro] = useState(null);
    const [setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const carregarLivros = async () => {
            try {
                const response = await fetch(
                    'https://backend-projeto-integrador-rana.onrender.com/api/',
                    {
                        headers: {
                            'x-api-key': 'amods',
                        },
                    }
                );

                if (!response.ok) {
                    const errorText = await response.text();
                    console.log('Erro retornado por /api/livro:', errorText);
                    throw new Error(`Erro ${response.status} ao buscar /api/livro`);
                }

                const data = await response.json();
                console.log('Resposta de /api/livro:', data);

                setLivro(Array.isArray(data) ? data[0] : data);
            } catch (error) {
                console.error('Erro ao buscar os dados do personagem:', error);
                setError('Nao foi possivel carregar os dados do personagem.');
            } finally {
                setLoading(false);
            }
        };

        carregarLivros();
    }, []);


    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className={styles.page}>
            <Header />
            <main className={styles.hero}>
                <div className={styles.tituloDiv}>
                    <h1 className={styles.title}>Equipe</h1>
                </div>
                <div className={styles.divGrandeIntegrantes}>
                    <div className={styles.linhaIntegrantes}>
                        <div className={styles.integrante}>
                            <img
                                style={{width: '90px'}}
                                src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/sonic-icon.png"
                                alt="integrante 1"
                            />
                            <h4>Douglas</h4>
                            <p>tecnico de ds</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};
