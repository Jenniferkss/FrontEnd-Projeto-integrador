import styles from './Sobre.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import fieldsMap from '../../mapeamento/mapeamento';

export default function Inicio() {
    const [equipe, setEquipe] = useState(null);
    const [error, setError] = useState(null);
    const { language, mapFields } = useLanguage();

    const getMember = (id) => mapFields(equipe?.find((e) => e.id === id) || {}, fieldsMap.sobreMember);

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

    if (error) return <p>{error}</p>;

    const ids = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

    return (
        <div className={styles.pageContainer}>
            <Header />
            <main className={styles.hero}>
                <div className={styles.tituloDiv}>
                    <h1 className={styles.title}>{language === 'en' ? 'Team' : 'Equipe'}</h1>
                </div>
                <div className={styles.divGrandeIntegrantes}>
                    <div className={styles.linhaIntegrantes}>
                        {[5, 6, 7, 8, 9, 10, 11].map((id) => (
                            <div key={id} className={styles.integrante}>
                                <img
                                    style={{ width: '120px', borderRadius: '15px', height: '155px', border: '2px solid #7d0f0f' }}
                                    src={getMember(id).fotoEquipe || equipe?.find((e) => e.id === id)?.fotoEquipe || ''}
                                    alt={`integrante ${id}`}
                                />
                                <h4>{getMember(id).nome || (language === 'en' ? 'Member name' : 'Nome integrante')}</h4>
                                <p className={styles.integranteCurso}>{getMember(id).curso || (language === 'en' ? 'Member course' : 'Curso integrante')}</p>
                            </div>
                        ))}
                    </div>
                    <div className={styles.linhaIntegrantes}>
                        {[12, 13, 14, 15, 16, 17, 18].map((id) => (
                            <div key={id} className={styles.integrante}>
                                <img
                                    style={{ width: '120px', borderRadius: '15px', height: '155px', border: '2px solid #7d0f0f' }}
                                    src={getMember(id).fotoEquipe || equipe?.find((e) => e.id === id)?.fotoEquipe || ''}
                                    alt={`integrante ${id}`}
                                />
                                <h4>{getMember(id).nome || (language === 'en' ? 'Member name' : 'Nome integrante')}</h4>
                                <p className={styles.integranteCurso}>{getMember(id).curso || (language === 'en' ? 'Member course' : 'Curso integrante')}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}