import styles from './Sobre.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useEffect, useState } from 'react';

export default function Inicio() {
    const [equipe, setEquipe] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const carregarEquipe = async () => {
            try {
                const response = await fetch(
                    'https://backend-projeto-integrador-rana.onrender.com/api/equipe',
                    { headers: { 'x-api-key': 'amods' } },
                );

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Erro ${response.status}: ${errorText}`);
                }

                const data = await response.json();
                setEquipe(Array.isArray(data) ? data : [data]);
            } catch (error) {
                console.error('Erro ao buscar os dados:', error);
                setError('Não foi possível carregar os dados da equipe.');
            }
        };

        carregarEquipe();
    }, []);

    const ids = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

    if (error) return <p>{error}</p>;

    return (
        <div className={styles.pageContainer}>
            <Header />
            <div className={styles.boxedLayout}>
                <main className={styles.hero}>
                    <div className={styles.tituloDiv}>
                        <h1 className={styles.title}>Equipe</h1>
                    </div>
                    <div className={styles.divGrandeIntegrantes}>
                        {ids.map((id) => (
                            <div key={id} className={styles.integrante}>
                                <img
                                    className={styles.integranteImg}
                                    src={equipe?.find((e) => e.id === id)?.fotoEquipe || ''}
                                    alt={equipe?.find((e) => e.id === id)?.nome || 'Integrante'}
                                />
                                <h4>{equipe?.find((e) => e.id === id)?.nome || 'Nome integrante'}</h4>
                                <p className={styles.integranteCurso}>
                                    {equipe?.find((e) => e.id === id)?.curso || 'Curso integrante'}
                                </p>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}