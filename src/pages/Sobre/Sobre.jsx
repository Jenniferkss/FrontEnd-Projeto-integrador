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
                                src={equipe?.find((e) => e.id === 5)?.fotoEquipe || 'Foto do integrante'}
                                alt="integrante 1"
                            />
                            <h4>{equipe?.find((e) => e.id === 5)?.nome || 'Nome integrante'}</h4>
                            <p className={styles.integranteCurso}>{equipe?.find((e) => e.id === 5)?.curso || 'Curso integrante'}</p>
                        </div>
                        <div className={styles.integrante}>
                            <img
                                style={{ width: '90px' }}
                                src={equipe?.find((e) => e.id === 6)?.fotoEquipe || 'Foto do integrante'}
                                alt="integrante 1"
                            />
                            <h4>{equipe?.find((e) => e.id === 6)?.nome || 'Nome integrante'}</h4>
                            <p className={styles.integranteCurso}>{equipe?.find((e) => e.id === 6)?.curso || 'Curso integrante'}</p>
                        </div>
                        <div className={styles.integrante}>
                            <img
                                style={{ width: '90px' }}
                                src={equipe?.find((e) => e.id === 7)?.fotoEquipe || 'Foto do integrante'}   
                                alt="integrante 1"
                            />
                            <h4>{equipe?.find((e) => e.id === 7)?.nome || 'Nome integrante'}</h4>
                            <p className={styles.integranteCurso}>{equipe?.find((e) => e.id === 7)?.curso || 'Curso integrante'}</p>
                        </div>
                        <div className={styles.integrante}>
                            <img
                                style={{ width: '90px' }}
                                src={equipe?.find((e) => e.id === 8)?.fotoEquipe || 'Foto do integrante'}
                                alt="integrante 1"
                            />
                            <h4>{equipe?.find((e) => e.id === 8)?.nome || 'Nome integrante'}</h4>
                            <p className={styles.integranteCurso}>{equipe?.find((e) => e.id === 8)?.curso || 'Curso integrante'}</p>
                        </div>
                        <div className={styles.integrante}>
                            <img
                                style={{ width: '90px' }}
                                src={equipe?.find((e) => e.id === 9)?.fotoEquipe || 'Foto do integrante'}
                                alt="integrante 1"
                            />
                            <h4>{equipe?.find((e) => e.id === 9)?.nome || 'Nome integrante'}</h4>
                            <p className={styles.integranteCurso}>{equipe?.find((e) => e.id === 9)?.curso || 'Curso integrante'}</p>
                        </div>
                        <div className={styles.integrante}>
                            <img
                                style={{ width: '90px' }}
                                src={equipe?.find((e) => e.id === 10)?.fotoEquipe || 'Foto do integrante'}
                                alt="integrante 1"
                            />
                            <h4>{equipe?.find((e) => e.id === 10)?.nome || 'Nome integrante'}</h4>
                            <p className={styles.integranteCurso}>{equipe?.find((e) => e.id === 10)?.curso || 'Curso integrante'}</p>
                        </div>
                        <div className={styles.integrante}>
                            <img
                                style={{ width: '90px' }}
                                src={equipe?.find((e) => e.id === 11)?.fotoEquipe || 'Foto do integrante'}
                                alt="integrante 1"
                            />
                            <h4>{equipe?.find((e) => e.id === 11)?.nome || 'Nome integrante'}</h4>
                            <p className={styles.integranteCurso} >{equipe?.find((e) => e.id === 11)?.curso || 'Curso integrante'}</p>
                        </div>

                    </div>
                    <div className={styles.linhaIntegrantes}>

                        
                        
                        <div className={styles.integrante}>
                            <img
                                style={{ width: '90px' }}
                                src={equipe?.find((e) => e.id === 12)?.fotoEquipe || 'Foto do integrante'}
                                alt="integrante 1"
                            />
                            <h4>{equipe?.find((e) => e.id === 12)?.nome || 'Nome integrante'}</h4>
                            <p className={styles.integranteCurso}>{equipe?.find((e) => e.id === 12)?.curso || 'Curso integrante'}</p>
                        </div>
                        <div className={styles.integrante}>
                            <img
                                style={{ width: '90px' }}
                                src={equipe?.find((e) => e.id === 13)?.fotoEquipe || 'Foto do integrante'}
                                alt="integrante 1"
                            />
                            <h4>{equipe?.find((e) => e.id === 13)?.nome || 'Nome integrante'}</h4>
                            <p className={styles.integranteCurso}   >{equipe?.find((e) => e.id === 13)?.curso || 'Curso integrante'}</p>
                        </div>
                        <div className={styles.integrante}>
                            <img
                                style={{ width: '90px' }}
                                src={equipe?.find((e) => e.id === 14)?.fotoEquipe || 'Foto do integrante'}
                                alt="integrante 1"
                            />
                            <h4>{equipe?.find((e) => e.id === 14)?.nome || 'Nome integrante'}</h4>
                            <p className={styles.integranteCurso}>{equipe?.find((e) => e.id === 14)?.curso || 'Curso integrante'}</p>
                        </div>
                        <div className={styles.integrante}>
                            <img
                                style={{ width: '90px' }}
                                src={equipe?.find((e) => e.id === 15)?.fotoEquipe || 'Foto do integrante'}
                                alt="integrante 1"
                            />
                            <h4>{equipe?.find((e) => e.id === 15)?.nome || 'Nome integrante'}</h4>
                            <p className={styles.integranteCurso}>{equipe?.find((e) => e.id === 15)?.curso || 'Curso integrante'}</p>
                        </div>
                        <div className={styles.integrante}>
                            <img
                                style={{ width: '90px' }}
                                src={equipe?.find((e) => e.id === 16)?.fotoEquipe || 'Foto do integrante'}
                                alt="integrante 1"
                            />
                            <h4>{equipe?.find((e) => e.id === 16)?.nome || 'Nome integrante'}</h4>
                            <p className={styles.integranteCurso}>{equipe?.find((e) => e.id === 16)?.curso || 'Curso integrante'}</p>
                        </div>
                        <div className={styles.integrante}>
                            <img
                                style={{ width: '90px' }}
                                src={equipe?.find((e) => e.id === 17)?.fotoEquipe || 'Foto do integrante'}
                                alt="integrante 1"
                            />
                            <h4>{equipe?.find((e) => e.id === 17)?.nome || 'Nome integrante'}</h4>
                            <p className={styles.integranteCurso}>{equipe?.find((e) => e.id === 17)?.curso || 'Curso integrante'}</p>
                        </div>
                        <div className={styles.integrante}>
                            <img
                                style={{ width: '90px' }}
                                src={equipe?.find((e) => e.id === 18)?.fotoEquipe || 'Foto do integrante'}
                                alt="integrante 1"
                            />
                            <h4>{equipe?.find((e) => e.id === 18)?.nome || 'Nome integrante'}</h4>
                            <p className={styles.integranteCurso}>{equipe?.find((e) => e.id === 18)?.curso || 'Curso integrante'}</p>
                        </div>

                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
};
