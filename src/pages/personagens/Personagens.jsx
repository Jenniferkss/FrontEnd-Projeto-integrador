import { useEffect, useState } from 'react';
import styles from './Personagens.module.css';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useLanguage } from '../../context/LanguageContext.jsx';

function toList(value) {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string' && value.trim()) return [value.trim()];
    return [];
}


export default function Personagens() {
    const [livro, setLivro] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { t, selectField } = useLanguage();

    useEffect(() => {
        const carregarLivros = async () => {
            try {
                const response = await fetch(
                    'https://backend-projeto-integrador-rana.onrender.com/api/livro',
                    { headers: { 'x-api-key': 'amods' } }
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

    if (error) return <p>{error}</p>;

    const characters = selectField(livro, 'personagens') || livro?.personagens || [];
    const photos = selectField(livro, 'fotoPersonagens') || livro?.fotoPersonagens || [];
    const descriptions =
        toList(
            selectField(livro, 'descricaoPersonagens') ||
            livro?.descricaoPersonagens ||
            selectField(livro, 'descricoesPersonagens') ||
            livro?.descricoesPersonagens ||
            selectField(livro, 'descricaoPersonagensPT') ||
            livro?.descricaoPersonagensPT ||
            selectField(livro, 'descricoesPersonagensPT') ||
            livro?.descricoesPersonagensPT
        );
    const count = Math.max(characters.length || 0, 12);

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
                    {Array.from({ length: count }, (_, i) => (
                        <div key={i} className={styles.questoes}>
                            <img
                                src={loading ? '' : photos[i] || ''}
                                alt={loading ? 'Carregando...' : characters[i] || 'Personagem'}
                                className={styles.personagemFoto}
                            />
                            <div className={styles.divNomeDesc}>
                                <h1 className="title-main" style={{ marginBottom: '20px' }}>
                                    {loading ? 'Carregando personagem...' : characters[i] || 'Nome personagem'}
                                </h1>
                                <p>{descriptions[i] || 'Descrição indisponível'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
