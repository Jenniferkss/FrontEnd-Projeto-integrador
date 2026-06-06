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
                    {
                        headers: { 'x-api-key': 'amods' },
                    },
                );
                if (!response.ok) throw new Error('Erro ao buscar API');
                const data = await response.json();
                setEquipe(Array.isArray(data) ? data : [data]);
            } catch (error) {
                setError('Não foi possível carregar os dados.');
            }
        };
        carregarEquipe();
    }, []);

    if (error) return <p>{error}</p>;

    const fotoStyle = { 
        width: '120px', 
        borderRadius: '15px', 
        height: '155px', 
        border: '2px solid #7d0f0f',
        objectFit: 'cover'
    };

    return (
        <div className={styles.pageContainer}>
            <Header />
            
            <main className={styles.hero}>
                   <section className={styles.banner}>
                                   <p className={styles.kicker}>Conheça</p>
                                   <h1 className={styles.titulo}> Nossa Equipe</h1>
                                   <p className={styles.subtitulo}>
                                      Focados em entregar o melhor conteúdo para nossos usuários, nossa equipe é composta por estudantes dedicados e apaixonados por educação.
                                   </p>
                               </section>
                
                <div className={styles.divGrandeIntegrantes}>
                    {/* PRIMEIRA LINHA */}
                    <div className={styles.linhaIntegrantes}>
                        {[5, 6, 7, 8, 9, 10, 11].map((id) => {
                            const integrante = equipe?.find((e) => e.id === id);
                            return (
                                <div key={id} className={styles.integrante}>
                                    <img
                                        style={fotoStyle}
                                        src={integrante?.fotoEquipe || ''}
                                        alt={integrante?.nome || "Foto"}
                                    />
                                    <h4>{integrante?.nome || 'Nome integrante'}</h4>
                                    <p className={styles.integranteCurso}>{integrante?.curso || 'Curso'}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* SEGUNDA LINHA */}
                    <div className={styles.linhaIntegrantes}>
                        {[12, 13, 14, 15, 16, 17, 18].map((id) => {
                            const integrante = equipe?.find((e) => e.id === id);
                            return (
                                <div key={id} className={styles.integrante}>
                                    <img
                                        style={fotoStyle}
                                        src={integrante?.fotoEquipe || ''}
                                        alt={integrante?.nome || "Foto"}
                                    />
                                    <h4>{integrante?.nome || 'Nome integrante'}</h4>
                                    <p className={styles.integranteCurso}>{integrante?.curso || 'Curso'}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}