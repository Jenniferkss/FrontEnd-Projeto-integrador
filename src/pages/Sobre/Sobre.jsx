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

    const ids = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

    if (error) return <p>{error}</p>;

    return (
        <div className={styles.pageContainer}>
            <Header />
            <main className={styles.hero}>
                <div className={styles.tituloDiv}>
                    <h1 className={styles.title}>{language === 'en' ? 'Team' : 'Equipe'}</h1>
                </div>
                <div className={styles.divGrandeIntegrantes}>
                    <div className={styles.linhaIntegrantes}>

                        <div className={styles.integrante}>
                            <img
                                style={{ width: '120px', borderRadius: '15px', height: '155px', border: '2px solid #7d0f0f' }}
                                src={getMember(5).fotoEquipe || equipe?.find((e) => e.id === 5)?.fotoEquipe || 'Foto do integrante'}
                                alt="integrante 1"
                            />
                            <h4>{getMember(5).nome || (language === 'en' ? 'Member name' : 'Nome integrante')}</h4>
                            <p className={styles.integranteCurso}>{getMember(5).curso || (language === 'en' ? 'Member course' : 'Curso integrante')}</p>
                        </div>
                        <div className={styles.integrante}>
                            <img
                                style={{ width: '120px', borderRadius: '15px', height: '155px', border: '2px solid #7d0f0f' }}
                                src={getMember(6).fotoEquipe || equipe?.find((e) => e.id === 6)?.fotoEquipe || 'Foto do integrante'}
                                alt="integrante 1"
                            />
                            <h4>{getMember(6).nome || (language === 'en' ? 'Member name' : 'Nome integrante')}</h4>
                            <p className={styles.integranteCurso}>{getMember(6).curso || (language === 'en' ? 'Member course' : 'Curso integrante')}</p>
                        </div>
                        <div className={styles.integrante}>
                            <img
                                style={{ width: '120px', borderRadius: '15px', height: '155px', border: '2px solid #7d0f0f' }}
                                src={equipe?.find((e) => e.id === 7)?.fotoEquipe || 'Foto do integrante'}   
                                alt="integrante 1"
                            />
                            <h4>{getMember(7).nome || (language === 'en' ? 'Member name' : 'Nome integrante')}</h4>
                            <p className={styles.integranteCurso}>{getMember(7).curso || (language === 'en' ? 'Member course' : 'Curso integrante')}</p>
                        </div>
                        <div className={styles.integrante}>
                            <img
                                style={{ width: '120px', borderRadius: '15px', height: '155px', border: '2px solid #7d0f0f' }}
                                src={equipe?.find((e) => e.id === 8)?.fotoEquipe || 'Foto do integrante'}
                                alt="integrante 1"
                            />
                            <h4>{getMember(8).nome || (language === 'en' ? 'Member name' : 'Nome integrante')}</h4>
                            <p className={styles.integranteCurso}>{getMember(8).curso || (language === 'en' ? 'Member course' : 'Curso integrante')}</p>
                        </div>
                        <div className={styles.integrante}>
                            <img
                                style={{ width: '120px', borderRadius: '15px', height: '155px', border: '2px solid #7d0f0f' }}
                                src={equipe?.find((e) => e.id === 9)?.fotoEquipe || 'Foto do integrante'}
                                alt="integrante 1"
                            />
                            <h4>{getMember(9).nome || 'Nome integrante'}</h4>
                            <p className={styles.integranteCurso}>{getMember(9).curso || 'Curso integrante'}</p>
                        </div>
                        <div className={styles.integrante}>
                            <img
                                style={{ width: '120px', borderRadius: '15px', height: '155px', border: '2px solid #7d0f0f' }}
                                src={equipe?.find((e) => e.id === 10)?.fotoEquipe || 'Foto do integrante'}
                                alt="integrante 1"
                            />
                            <h4>{getMember(10).nome || 'Nome integrante'}</h4>
                            <p className={styles.integranteCurso}>{getMember(10).curso || 'Curso integrante'}</p>
                        </div>
                        <div className={styles.integrante}>
                            <img
                                style={{ width: '120px', borderRadius: '15px', height: '155px', border: '2px solid #7d0f0f' }}
                                src={equipe?.find((e) => e.id === 11)?.fotoEquipe || 'Foto do integrante'}
                                alt="integrante 1"
                            />
                            <h4>{getMember(11).nome || 'Nome integrante'}</h4>
                            <p className={styles.integranteCurso} >{getMember(11).curso || 'Curso integrante'}</p>
                        </div>

                    </div>
                    <div className={styles.linhaIntegrantes}>

                        
                        
                        <div className={styles.integrante}>
                            <img
                                style={{ width: '120px', borderRadius: '15px', height: '155px', border: '2px solid #7d0f0f' }}
                                src={equipe?.find((e) => e.id === 12)?.fotoEquipe || 'Foto do integrante'}
                                alt="integrante 1"
                            />
                            <h4>{getMember(12).nome || 'Nome integrante'}</h4>
                            <p className={styles.integranteCurso}>{getMember(12).curso || 'Curso integrante'}</p>
                        </div>
                        <div className={styles.integrante}>
                            <img
                                style={{width: '120px', borderRadius: '15px', height: '155px', border: '2px solid #7d0f0f'   }}
                                src={equipe?.find((e) => e.id === 13)?.fotoEquipe || 'Foto do integrante'}
                                alt="integrante 1"
                            />
                            <h4>{getMember(13).nome || 'Nome integrante'}</h4>
                            <p className={styles.integranteCurso}   >{getMember(13).curso || 'Curso integrante'}</p>
                        </div>
                        <div className={styles.integrante}>
                            <img
                                style={{ width: '120px', borderRadius: '15px', height: '155px', border: '2px solid #7d0f0f' }}
                                src={equipe?.find((e) => e.id === 14)?.fotoEquipe || 'Foto do integrante'}
                                alt="integrante 1"
                            />
                            <h4>{getMember(14).nome || 'Nome integrante'}</h4>
                            <p className={styles.integranteCurso}>{getMember(14).curso || 'Curso integrante'}</p>
                        </div>
                        <div className={styles.integrante}>
                            <img
                                style={{ width: '120px', borderRadius: '15px', height: '155px', border: '2px solid #7d0f0f' }}
                                src={equipe?.find((e) => e.id === 15)?.fotoEquipe || 'Foto do integrante'}
                                alt="integrante 1"
                            />
                            <h4>{getMember(15).nome || 'Nome integrante'}</h4>
                            <p className={styles.integranteCurso}>{getMember(15).curso || 'Curso integrante'}</p>
                        </div>
                        <div className={styles.integrante}>
                            <img
                                style={{ width: '120px', borderRadius: '15px', height: '155px', border: '2px solid #7d0f0f' }}
                                src={equipe?.find((e) => e.id === 16)?.fotoEquipe || 'Foto do integrante'}
                                alt="integrante 1"
                            />
                            <h4>{getMember(16).nome || 'Nome integrante'}</h4>
                            <p className={styles.integranteCurso}>{getMember(16).curso || 'Curso integrante'}</p>
                        </div>
                        <div className={styles.integrante}>
                            <img
                                style={{ width: '120px', borderRadius: '15px', height: '155px', border: '2px solid #7d0f0f' }}
                                src={equipe?.find((e) => e.id === 17)?.fotoEquipe || 'Foto do integrante'}
                                alt="integrante 1"
                            />
                            <h4>{getMember(17).nome || 'Nome integrante'}</h4>
                            <p className={styles.integranteCurso}>{getMember(17).curso || 'Curso integrante'}</p>
                        </div>
                        <div className={styles.integrante}>
                            <img
                                style={{ width: '120px', borderRadius: '15px', height: '155px', border: '2px solid #7d0f0f' }}
                                src={equipe?.find((e) => e.id === 18)?.fotoEquipe || 'Foto do integrante'}
                                alt="integrante 1"
                            />
                            <h4>{getMember(18).nome || 'Nome integrante'}</h4>
                            <p className={styles.integranteCurso}>{getMember(18).curso || 'Curso integrante'}</p>
                        </div>

                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}