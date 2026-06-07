import { useEffect, useState } from 'react';
import styles from './Personagens.module.css';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useLanguage } from '../../context/LanguageContext.jsx';

const Descricoes = [
  'Narradora e protagonista da obra. Mulher negra, catadora de papel e mãe solteira que vive na favela do Canindé, em São Paulo. Carolina é observadora, crítica e extremamente consciente da desigualdade social ao seu redor. A escrita funciona como forma de resistência e denúncia.',

  'Filha caçula de Carolina. Representa inocência e esperança dentro do livro. Carolina frequentemente expressa o desejo de oferecer uma vida melhor para ela.',

  'Filho de Carolina. Geralmente descrito como mais sensível e obediente. A autora demonstra forte preocupação com sua alimentação, educação e futuro.',

  'Filho de Carolina. É apresentado como uma criança mais rebelde e difícil de controlar. Muitas vezes aparece em conflitos comuns da vida na favela, mostrando as dificuldades da maternidade em situação de pobreza extrema.',

  'Morador da favela citado por Carolina. Representa os trabalhadores pobres que enfrentam diariamente a luta pela sobrevivência em meio à miséria e à exclusão social.',

  'Peixeiro mencionado na obra. Surge em relatos do cotidiano da comunidade e ajuda a retratar as relações econômicas e sociais existentes entre os moradores da favela.',

  'Eletricista citado por Carolina. Faz parte do conjunto de personagens secundários que ilustram a realidade dos trabalhadores e as dificuldades enfrentadas pelos habitantes do Canindé.',

  'Morador da favela mencionado nos relatos de Carolina. Sua presença contribui para retratar os desafios, conflitos e formas de solidariedade existentes na comunidade.',

  'Personagem citado no cotidiano da favela. Representa as relações sociais construídas entre os moradores e as dificuldades impostas pela pobreza.',

  'Figura conhecida entre os habitantes do Canindé. Aparece como parte da rede de convivência da comunidade, evidenciando as diferentes estratégias de sobrevivência dos moradores.',

  'Morador mencionado por Carolina em diversos momentos. Sua participação ajuda a demonstrar os impactos da desigualdade social e das condições precárias de vida na favela.',

  'Personagem secundário que contribui para a construção do retrato social apresentado pela autora, evidenciando a realidade dos trabalhadores pobres e marginalizados.'
];


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
                                <p>{Descricoes[i] || 'Descrição do personagem'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
