import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './AObra.module.css';

export default function AObra() {
    const [dados, setDados] = useState({});

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const response = await fetch(
                    'https://backend-projeto-integrador-rana.onrender.com/api/aObra',
                    {
                        method: 'GET',
                        headers: {
                            'x-api-key': 'amods',
                            'Content-Type': 'application/json',
                        },
                    },
                );

                if (!response.ok) {
                    throw new Error(`Erro ${response.status} ao buscar dados.`);
                }

                const data = await response.json();

                console.log('Dados recebidos:', data);

                setDados(Array.isArray(data) ? data[0] : data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } 
        };

        carregarDados();
    }, []);


import styles from '../Obra/AObra.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { request } from '../../services/api.js';

import carolina from '../../../public/images/carolina.png';
import livro from '../../../public/images/livro.png';

export default function ObraVestibular() {
    const [dados, setDados] = useState(null);
    const [carregando, setCarregando] = useState(true);

    const { language } = useLanguage();

    useEffect(() => {
        const carregarLivros = async () => {
            try {
                const data = await request('/api/dicaVestibular', {
                    method: 'GET',
                    headers: {
                        'x-api-key': 'amods',
                    },
                });

                setDados(Array.isArray(data) ? data[0] : data);
            } catch (error) {
                console.error('Erro ao conectar com o back-end:', error);
            } finally {
                setCarregando(false);
            }
        };

        carregarLivros();
    }, []);

    if (carregando) {
        return (
            <div className={styles.loading}>
                <p>
                    {language === 'en'
                        ? 'Loading database info...'
                        : 'Carregando dados do banco...'}
                </p>
            </div>
        );
    }

    if (!dados) {
        return (
            <div className={styles.loading}>
                <p>{language === 'en' ? 'No records found.' : 'Nenhum registro encontrado.'}</p>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <Header />

            <section className={styles.hero}>
                <div className={styles.leftHero}>
                    <div className={styles.titleBox}>
                        <h2 className={styles.titleMain}>
                            {dados.tituloPrincipal || 'Quarto de'}
                        </h2>

                        <h2 className={styles.titleItalic}>
                            {dados.tituloSecundario || 'Despejo'}
                        </h2>
                    </div>

                    <div className={styles.quoteBox}>
                        <p className={styles.quote}>
                            “
                            {dados.citacao ||
                                'O Brasil precisa ser dirigido por alguém que já passou fome'}
                            ”
                        </p>

                        <p className={styles.author}>
                            {dados.autorCitacao || '- Carolina Maria de Jesus, 1960'}
                        <h1 className={styles.titleMain}>
                            {language === 'en' ? 'Child of ' : 'Quarto de'}
                        </h1>
                        <h1 className={styles.redTitleMain}>
                            {language === 'en' ? 'the Dark' : 'Despejo'}
                        </h1>

                        <p className={styles.subtitle}>
                            {language === 'en'
                                ? ' “Brazil needs to be led by someone who has already experienced hunger.” '
                                : ' “O Brasil precisa ser dirigido por alguém que já passou fome” '}
                        </p>

                        <p className={styles.subtitleAuthor}>
                            {language === 'en'
                                ? ' - Carolina Maria de Jesus '
                                : ' - Carolina Maria de Jesus '}
                        </p>
                    </div>

                    {dados.citacao && (
                        <div className={styles.quoteBox}>
                            <blockquote className={styles.quote}>“{dados.citacao}”</blockquote>

                            <p className={styles.author}>Carolina Maria de Jesus</p>
                        </div>
                    )}
                </div>

                <div className={styles.rightHero}>
                    <img
                        src="/public/images/carolina.png"
                        alt="Carolina Maria de Jesus"
                        className={styles.authorImage}
                    />
                </div>
            </section>


            <section className={styles.aboutBook}>
                <div className={styles.bookImage}>
                    <img
                        src="/public/images/livro.png"
                        alt="Livro Quarto de Despejo"
                        className={styles.bookCover}
                    />
                </div>

                <div className={styles.bookInfo}>
                    <p className={styles.sectionName}>
                        {dados.nomeSecao || 'A OBRA'}
                    </p>

                    <div className={styles.bookTitle}>
                        <h2>{dados.subtitulo1 || 'Um relato que'}</h2>

                        <h2 className={styles.redTitle}>
                            {dados.subtitulo2 || 'mudou o Brasil'}
                        </h2>
                    </div>

                    <div className={styles.cards}>
                        {(
                            dados.estatisticas || [
                                {
                                    nome: 'Publicação',
                                    porcentagem: 30,
                                },
                                {
                                    nome: 'Idiomas',
                                    porcentagem: 72,
                                },
                                {
                                    nome: 'Vendas',
                                    porcentagem: 42,
                                },
                            ]
                        ).map((est, index) => (
                            <div key={index} className={styles.card}>
                                <p>{est.nome}</p>

                                <h3>{est.porcentagem}%</h3>
                            </div>
                        ))}

                        <div className={styles.card}>
                            <p>Publicação</p>
                            <h3>{dados.publicacao || '1960'}</h3>
                        </div>

                        <div className={styles.card}>
                            <p>Idiomas</p>
                            <h3>{dados.idiomas || '13 traduções'}</h3>
                        </div>

                        <div className={styles.card}>
                            <p>Vendas</p>
                            <h3>{dados.vendas || '1 milhão +'}</h3>
                        </div>

                        <div className={styles.card}>
                            <p>Gênero</p>
                            <h3>{dados.genero || 'Diário / Autobiografia'}</h3>
                        </div>
                    </div>

                    <div className={styles.textBox}>
                        {Array.isArray(dados.descricao) ? (
                            dados.descricao.map((texto, index) => (
                                <p key={index}>{texto}</p>
                            ))
                        ) : (
                            <>
                                <p>
                                    "Quarto de Despejo: Diário de uma Favelada" é o relato visceral
                                    e poético de Carolina Maria de Jesus sobre a sua vida na favela
                                    do Canindé, em São Paulo.
                                </p>

                                <p>
                                    Escrito entre 1955 e 1960, o diário documenta com uma
                                    honestidade brutal a fome, a miséria e a luta diária pela
                                    sobrevivência.
                                </p>

                                <p>
                                    A obra se tornou um fenômeno editorial, traduzida para mais de
                                    13 idiomas e reconhecida como um dos mais importantes
                                    testemunhos da literatura brasileira.
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* ANÁLISE */}
            <section className={styles.container}>
                <div className={styles.textContainer}>
                    <h2 className={styles.titleContainer}>
                        {dados.tituloAnalise || 'Análise da obra'}
                    </h2>

                    <p>
                        {dados.analise ||
                            `A obra Quarto de Despejo, de Carolina Maria de Jesus, é um relato autobiográfico em forma de diário que oferece uma visão direta e impactante da vida na favela do Canindé, em São Paulo, na década de 1950.`}
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
}