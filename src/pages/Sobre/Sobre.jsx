import styles from './Sobre.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useEffect, useState } from 'react';

export default function Inicio() {
    const [equipe, setEquipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const carregarEquipe = async () => {
            try {
                const response = await fetch(
                    'https://backend-projeto-integrador-rana.onrender.com/api/equipe',
                    {
                        headers: {
                            'x-api-key': 'amods',
                        },
                    },
                );

                if (!response.ok) {
                    const errorText = await response.text();
                    console.log('Erro retornado por /api/equipe:', errorText);
                    throw new Error(`Erro ${response.status} ao buscar /api/equipe: ${errorText}`);
                }

                const data = await response.json();
                console.log('Resposta de /api/equipe:', data);

                // Mude o setEquipe para guardar tudo:
                setEquipe(Array.isArray(data) ? data : [data]);
            } catch (error) {
                console.error('Erro ao buscar os dados do integrante:', error);
                setError('Nao foi possivel carregar os dados do integrante.');
            } finally {
                setLoading(false);
            }
        };

        carregarEquipe();
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
                                style={{ width: '90px' }}
                                src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/sonic-icon.png"
                                alt="integrante 1"
                            />
                            <h4>{equipe?.find((e) => e.id === 2)?.nome || 'Nome integrante'}</h4>
                            <p>{equipe?.find((e) => e.id === 2)?.curso || 'Curso integrante'}</p>
                        </div>
                        <div className={styles.integrante}>
                            <img
                                style={{ width: '90px' }}
                                src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/sonic-icon.png"
                                alt="integrante 1"
                            />
                            <h4>{equipe?.find((e) => e.id === 3)?.nome || 'Nome integrante'}</h4>
                            <p>{equipe?.find((e) => e.id === 3)?.curso || 'Curso integrante'}</p>
                        </div>
                        <div className={styles.integrante}>
                            <img
                                style={{ width: '90px' }}
                                src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/sonic-icon.png"
                                alt="integrante 1"
                            />
                            <h4>{equipe?.find((e) => e.id === 4)?.nome || 'Nome integrante'}</h4>
                            <p>{equipe?.find((e) => e.id === 4)?.curso || 'Curso integrante'}</p>
                        </div>
                        <div className={styles.integrante}>
                            <img
                                style={{ width: '90px' }}
                                src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/sonic-icon.png"
                                alt="integrante 1"
                            />
                            <h4>{equipe?.find((e) => e.id === 5)?.nome || 'Nome integrante'}</h4>
                            <p>{equipe?.find((e) => e.id === 5)?.curso || 'Curso integrante'}</p>
                        </div>
                        <div className={styles.integrante}>
                            <img
                                style={{ width: '90px' }}
                                src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/sonic-icon.png"
                                alt="integrante 1"
                            />
                            <h4>{equipe?.find((e) => e.id === 6)?.nome || 'Nome integrante'}</h4>
                            <p>{equipe?.find((e) => e.id === 6)?.curso || 'Curso integrante'}</p>
                        </div>

                    </div>
                    <div className={styles.linhaIntegrantes}>

                        <div className={styles.integrante}>
                            <img
                                style={{ width: '90px' }}
                                src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/sonic-icon.png"
                                alt="integrante 1"
                            />
                            <h4>{equipe?.find((e) => e.id === 2)?.nome || 'Nome integrante'}</h4>
                            <p>{equipe?.find((e) => e.id === 2)?.curso || 'Curso integrante'}</p>
                        </div>
                        <div className={styles.integrante}>
                            <img
                                style={{ width: '90px' }}
                                src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/sonic-icon.png"
                                alt="integrante 1"
                            />
                            <h4>{equipe?.find((e) => e.id === 3)?.nome || 'Nome integrante'}</h4>
                            <p>{equipe?.find((e) => e.id === 3)?.curso || 'Curso integrante'}</p>
                        </div>
                        <div className={styles.integrante}>
                            <img
                                style={{ width: '90px' }}
                                src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/sonic-icon.png"
                                alt="integrante 1"
                            />
                            <h4>{equipe?.find((e) => e.id === 4)?.nome || 'Nome integrante'}</h4>
                            <p>{equipe?.find((e) => e.id === 4)?.curso || 'Curso integrante'}</p>
                        </div>
                        <div className={styles.integrante}>
                            <img
                                style={{ width: '90px' }}
                                src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/sonic-icon.png"
                                alt="integrante 1"
                            />
                            <h4>{equipe?.find((e) => e.id === 5)?.nome || 'Nome integrante'}</h4>
                            <p>{equipe?.find((e) => e.id === 5)?.curso || 'Curso integrante'}</p>
                        </div>
                        <div className={styles.integrante}>
                            <img
                                style={{ width: '90px' }}
                                src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/sonic-icon.png"
                                alt="integrante 1"
                            />
                            <h4>{equipe?.find((e) => e.id === 6)?.nome || 'Nome integrante'}</h4>
                            <p>{equipe?.find((e) => e.id === 6)?.curso || 'Curso integrante'}</p>
                        </div>

                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
};
