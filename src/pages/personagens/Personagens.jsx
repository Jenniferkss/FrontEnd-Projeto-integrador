import { useEffect, useState } from 'react';
import styles from './Personagens.module.css';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useLanguage } from '../../context/LanguageContext.jsx';

export default function Inicio() {
    const [livro, setLivro] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { t, selectField } = useLanguage();

    useEffect(() => {
        const carregarLivros = async () => {
            try {
                const response = await fetch(
                    'https://backend-projeto-integrador-rana.onrender.com/api/livro',
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
                setLivro(Array.isArray(data) ? data[0] : data);
            } catch (error) {
                console.error('Erro ao buscar os dados do personagem:', error);
                setError(t('error_loading_characters'));
            } finally {
                setLoading(false);
            }
        };

        carregarLivros();
    }, [t]);


    if (error) {
        return <p>{error}</p>;
    }

    const characters = selectField(livro, 'personagens') || livro?.personagens || [];
    const photos = selectField(livro, 'fotoPersonagens') || livro?.fotoPersonagens || [];

    const count = Math.max(characters.length || 0, 12);
    const indices = Array.from({ length: count }, (_, i) => i);

    return (
        <div className={styles.page}>
            <Header />

            <main className={styles.hero}>
                <div className={styles.tituloDiv}>
                    <h1 className={styles.title}>{t('characters_title')}</h1>

                    <h1
                        className={styles.title}
                        style={{ color: '#6D0000', marginTop: '35px' }}
                    >
                        {t('characters_subtitle')}
                    </h1>
                </div>

                <div className={styles.divGrandeQuestoes}>
                    <div className={styles.questoes}>
                        <img
                            src={loading
                                ? 'Carregando personagem...'
                                : livro?.fotoPersonagens[0] || 'Nome personagem'}
                            alt="Carolina Maria de Jesus"
                            style={{ width: '13rem', borderRadius: '15px' }}
                        />
                        <div className={styles.divNomeDesc}>
                            <h1 className="title-main" style={{marginBottom: '20px'}}>
                                {loading
                                ? 'Carregando personagem...'
                                : livro?.personagens[0] || 'Nome personagem'}


                            </h1>
                        <p>
                           {loading
                                ? 'Carregando personagem...'
                                : livro?.descricaoPersonagensPT || 'Descrição do personagem'}
                        </p>

                        </div>

                    </div>

                    <div className={styles.questoes}>
                        <img
                            src={loading
                                ? 'Carregando personagem...'
                                : livro?.fotoPersonagens[1] || 'Nome personagem'}
                            alt="Carolina Maria de Jesus"
                            style={{ width: '13rem', borderRadius: '15px'  }}
                        />

                        <div className={styles.divNomeDesc}>
                            <h1 className="title-main" style={{marginBottom: '20px'}}>
                                {loading
                                ? 'Carregando personagem...'
                                : livro?.personagens[1] || 'Nome personagem'}
                            </h1>
                        <p>
                            Filho de Carolina. É apresentado como uma criança mais rebelde e difícil de controlar. Muitas vezes aparece em conflitos comuns da vida na favela, mostrando as dificuldades da maternidade em situação de pobreza extrema.
                        </p>

                        </div>
                    </div>

                    <div className={styles.questoes}>
                        <img
                            src={loading
                                ? 'Carregando personagem...'
                                : livro?.fotoPersonagens[2] || 'Nome personagem'}
                            alt="Carolina Maria de Jesus"
                            style={{ width: '13rem', borderRadius: '15px'  }}
                        />

                        <div className={styles.divNomeDesc}>
                            <h1 className="title-main" style={{marginBottom: '20px'}}>
                                {loading
                                ? 'Carregando personagem...'
                                : livro?.personagens[2] || 'Nome personagem'}
                            </h1>
                        <p>
                           Outro filho de Carolina. Geralmente descrito como mais sensível e obediente. A autora demonstra forte preocupação com sua alimentação, educação e futuro.
                        </p>

                        </div>
                    </div>

                    <div className={styles.questoes}>
                        <img
                            src={loading
                                ? 'Carregando personagem...'
                                : livro?.fotoPersonagens[3] || 'Nome personagem'}
                            alt="Carolina Maria de Jesus"
                            style={{ width: '13rem', borderRadius: '15px'  }}
                            />

                       <div className={styles.divNomeDesc}>
                            <h1 className="title-main" style={{marginBottom: '20px'}}>
                                {loading
                                ? 'Carregando personagem...'
                                : livro?.personagens[3] || 'Nome personagem'}
                            </h1>
                        <p>
                          Filha caçula de Carolina. Representa inocência e esperança dentro do livro. Carolina frequentemente expressa o desejo de oferecer uma vida melhor para ela.
                        </p>

                        </div>
                    </div>

                    <div className={styles.questoes}>
                        <img
                            src={loading
                                ? 'Carregando personagem...'
                                : livro?.fotoPersonagens[4] || 'Nome personagem'}
                            alt="Carolina Maria de Jesus"
                            style={{ width: '13rem', borderRadius: '15px'  }}
                        />

                        <div className={styles.divNomeDesc}>
                            <h1 className="title-main" style={{marginBottom: '20px'}}>
                                {loading
                                ? 'Carregando obra...'
                                : livro?.personagens[4] || 'Nome personagem'}
                            </h1>
                        <p>
Embora muitos apareçam apenas por nomes ou episódios rápidos, eles formam um “personagem coletivo”. Representam:
 a solidariedade entre os pobres;
 os conflitos causados pela miséria;
 violência, alcoolismo e disputas;
 a luta diária pela sobrevivência.
Alguns vizinhos ajudam Carolina; outros a criticam por escrever e por se considerar diferente.
                        </p>

                        </div>
                    </div>

                    <div className={styles.questoes}>
                        <img
                            src={loading
                                ? 'Carregando personagem...'
                                : livro?.fotoPersonagens[5] || 'Nome personagem'}
                            alt="Carolina Maria de Jesus"
                            style={{ width: '13rem', borderRadius: '15px'  }}
                        />

                        <div className={styles.divNomeDesc}>
                            <h1 className="title-main" style={{marginBottom: '20px'}}>
                                {loading
                                ? 'Carregando personagem...'
                                : livro?.personagens[5] || 'Nome personagem'}
                            </h1>
                        <p>
                         Aparecem de forma indireta e crítica. Carolina frequentemente denuncia promessas vazias, abandono social e corrupção. Eles simbolizam o descaso do poder público com a população pobre.
                        </p>

                        </div>
                    </div>
                    <div className={styles.questoes}>
                        <img
                            src={loading
                                ? 'Carregando personagem...'
                                : livro?.fotoPersonagens[6] || 'Nome personagem'}
                            alt="Carolina Maria de Jesus"
                            style={{ width: '13rem', borderRadius: '15px'  }}
                        />

                        <div className={styles.divNomeDesc}>
                            <h1 className="title-main" style={{marginBottom: '20px'}}>
                                {loading
                                ? 'Carregando personagem...'
                                : livro?.personagens[6] || 'Nome personagem'}
                            </h1>
                        <p>
                         Aparecem de forma indireta e crítica. Carolina frequentemente denuncia promessas vazias, abandono social e corrupção. Eles simbolizam o descaso do poder público com a população pobre.
                        </p>

                        </div>
                    </div>
                    <div className={styles.questoes}>
                        <img
                            src={loading
                                ? 'Carregando personagem...'
                                : livro?.fotoPersonagens[7] || 'Nome personagem'}
                            alt="Carolina Maria de Jesus"
                            style={{ width: '13rem', borderRadius: '15px'  }}
                        />

                        <div className={styles.divNomeDesc}>
                            <h1 className="title-main" style={{marginBottom: '20px'}}>
                                {loading
                                ? 'Carregando personagem...'
                                : livro?.personagens[7] || 'Nome personagem'}
                            </h1>
                        <p>
                         Aparecem de forma indireta e crítica. Carolina frequentemente denuncia promessas vazias, abandono social e corrupção. Eles simbolizam o descaso do poder público com a população pobre.
                        </p>

                        </div>
                    </div>
                    <div className={styles.questoes}>
                        <img
                            src={loading
                                ? 'Carregando personagem...'
                                : livro?.fotoPersonagens[8] || 'Nome personagem'}
                            alt="Carolina Maria de Jesus"
                            style={{ width: '13rem', borderRadius: '15px'  }}
                        />

                        <div className={styles.divNomeDesc}>
                            <h1 className="title-main" style={{marginBottom: '20px'}}>
                                {loading
                                ? 'Carregando personagem...'
                                : livro?.personagens[8] || 'Nome personagem'}
                            </h1>
                        <p>
                         Aparecem de forma indireta e crítica. Carolina frequentemente denuncia promessas vazias, abandono social e corrupção. Eles simbolizam o descaso do poder público com a população pobre.
                        </p>

                        </div>
                    </div>
                    <div className={styles.questoes}>
                        <img
                            src={loading
                                ? 'Carregando personagem...'
                                : livro?.fotoPersonagens[9] || 'Nome personagem'}
                            alt="Carolina Maria de Jesus"
                            style={{ width: '13rem', borderRadius: '15px' }}
                        />

                        <div className={styles.divNomeDesc}>
                            <h1 className="title-main" style={{marginBottom: '20px'}}>
                                {loading
                                ? 'Carregando personagem...'
                                : livro?.personagens[9] || 'Nome personagem'}
                            </h1>
                        <p>
                         Aparecem de forma indireta e crítica. Carolina frequentemente denuncia promessas vazias, abandono social e corrupção. Eles simbolizam o descaso do poder público com a população pobre.
                        </p>

                        </div>
                    </div>
                    <div className={styles.questoes}>
                        <img
                            src={loading
                                ? 'Carregando personagem...'
                                : livro?.fotoPersonagens[10] || 'Nome personagem'}
                            alt="Carolina Maria de Jesus"
                            style={{ width: '13rem', borderRadius: '15px'  }}
                        />

                        <div className={styles.divNomeDesc}>
                            <h1 className="title-main" style={{marginBottom: '20px'}}>
                                {loading
                                ? 'Carregando personagem...'
                                : livro?.personagens[10] || 'Nome personagem'}
                            </h1>
                        <p>
                         Aparecem de forma indireta e crítica. Carolina frequentemente denuncia promessas vazias, abandono social e corrupção. Eles simbolizam o descaso do poder público com a população pobre.
                        </p>

                        </div>
                    </div>
                    <div className={styles.questoes}>
                        <img
                            src= {loading
                                ? 'Carregando personagem...'
                                : livro?.fotoPersonagens[11] || 'Nome personagem'}
                            alt="Carolina Maria de Jesus"
                            style={{ width: '13rem', borderRadius: '15px'  }}
                        />

                        <div className={styles.divNomeDesc}>
                            <h1 className="title-main" style={{marginBottom: '20px'}}>
                                {loading
                                ? 'Carregando personagem...'
                                : livro?.personagens[11] || 'Nome personagem'}
                            </h1>
                        <p>
                         Aparecem de forma indireta e crítica. Carolina frequentemente denuncia promessas vazias, abandono social e corrupção. Eles simbolizam o descaso do poder público com a população pobre.
                        </p>

                        </div>
                    </div>

                    
                            <div className={styles.divNomeDesc}>
                                <h1 className="title-main" style={{ marginBottom: '20px' }}>
                                    {loading ? t('loading_character') : characters[idx] || t('name_placeholder')}
                                </h1>
                                <p>{t(`char_desc_${idx}`)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
