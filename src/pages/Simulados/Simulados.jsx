import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './Simulados.module.css';

const BASE_URL = 'https://backend-projeto-integrador-rana.onrender.com/api';
const headers = { 'x-api-key': 'amods' };

function Simulados({ idiomaDoSite = 'PT' }) {
    const [questoesFiltradas, setQuestoesFiltradas] = useState([]);
    const abaAtiva = String(idiomaDoSite).toUpperCase();

    const [indiceAtual, setIndiceAtual] = useState(0);
    const [respostas, setRespostas] = useState({});
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const [simuladoConcluido, setSimuladoConcluido] = useState(false);
    const [pontuacao, setPontuacao] = useState(0);

    const questaoAtual = questoesFiltradas[indiceAtual] || null;

    // ─── Carrega e cruza os dados das 3 rotas ───────────────────────────────────
    useEffect(() => {
        const carregarDados = async () => {
            try {
                setCarregando(true);
                setErro(null);

                // Busca questões e alternativas em paralelo
                const [resQuestoes, resAlternativas] = await Promise.all([
                    fetch(`${BASE_URL}/questao`, { headers }),
                    fetch(`${BASE_URL}/alternativa`, { headers }),
                ]);

                if (!resQuestoes.ok) throw new Error(`Erro ${resQuestoes.status} ao buscar questões.`);
                if (!resAlternativas.ok) throw new Error(`Erro ${resAlternativas.status} ao buscar alternativas.`);

                const questoesRaw = await resQuestoes.json();
                const alternativasRaw = await resAlternativas.json();

                if (!questoesRaw.length) throw new Error('Nenhuma questão disponível.');

                // Cruza questões com suas alternativas
                const questoesFormatadas = questoesRaw.map((q) => {
                    const altsDestaQuestao = alternativasRaw
                        .filter((alt) => alt.questaoId === q.id)
                        .map((alt, idx) => ({
                            id: String.fromCharCode(65 + idx), // A, B, C, D…
                            textoPt: alt.textoPt ?? '',
                            textoEn: alt.textoEn ?? '',
                        }));

                    // Descobre qual letra é a correta comparando o texto
                    const letraCorretaPt = altsDestaQuestao.find(
                        (alt) => alt.textoPt.trim().toLowerCase() === (q.respostaCorretaPt ?? '').trim().toLowerCase()
                    )?.id ?? 'A';

                    const letraCorretraEn = altsDestaQuestao.find(
                        (alt) => alt.textoEn.trim().toLowerCase() === (q.respostaCorretaEn ?? '').trim().toLowerCase()
                    )?.id ?? 'A';

                    return {
                        id: q.id,
                        perguntaPt: q.perguntaPt ?? '',
                        perguntaEn: q.perguntaEn ?? '',
                        explicacaoPt: q.explicacaoPt ?? 'Nenhuma explicação disponível.',
                        explicacaoEn: q.explicacaoEn ?? 'No explanation available.',
                        alternativas: altsDestaQuestao,
                        respostaCorretaPt: letraCorretaPt,
                        respostaCorretaEn: letraCorretraEn,
                    };
                });

                setQuestoesFiltradas(questoesFormatadas);
            } catch (err) {
                console.error(err);
                setErro(err.message);
            } finally {
                setCarregando(false);
            }
        };

        carregarDados();
    }, []);

    // ─── Helpers de idioma ──────────────────────────────────────────────────────
    const textoAlt = (alt) => (abaAtiva === 'EN' ? alt.textoEn : alt.textoPt);
    const enunciado = (q) => (abaAtiva === 'EN' ? q.perguntaEn : q.perguntaPt);
    const explicacao = (q) => (abaAtiva === 'EN' ? q.explicacaoEn : q.explicacaoPt);
    const respostaCorreta = (q) => (abaAtiva === 'EN' ? q.respostaCorretaEn : q.respostaCorretaPt);

    // ─── Interações ─────────────────────────────────────────────────────────────
    const selecionarAlternativa = (alternativaId) => {
        if (!questaoAtual) return;
        setRespostas((prev) => ({ ...prev, [questaoAtual.id]: alternativaId }));
    };

    const finalizarSimulado = () => {
        let acertos = 0;
        questoesFiltradas.forEach((q) => {
            const resp = respostas[q.id];
            if (resp && String(resp).toUpperCase() === String(respostaCorreta(q)).toUpperCase()) {
                acertos++;
            }
        });
        setPontuacao(acertos);
        setSimuladoConcluido(true);
    };

    const reiniciarSimulado = () => {
        setRespostas({});
        setIndiceAtual(0);
        setSimuladoConcluido(false);
        setPontuacao(0);
    };

    // ─── Loading / Erro ─────────────────────────────────────────────────────────
    if (carregando)
        return (
            <div className={styles.page}>
                <Header />
                <main className={styles.hero}>
                    <p style={{ textAlign: 'center', marginTop: '3rem' }}>Carregando questões...</p>
                </main>
                <Footer />
            </div>
        );

    if (erro)
        return (
            <div className={styles.page}>
                <Header />
                <main className={styles.hero}>
                    <p style={{ textAlign: 'center', color: 'red', marginTop: '3rem' }}>⚠️ {erro}</p>
                </main>
                <Footer />
            </div>
        );

    // ─── Tela de resultado ───────────────────────────────────────────────────────
    if (simuladoConcluido) {
        const porcentagem =
            questoesFiltradas.length > 0
                ? ((pontuacao / questoesFiltradas.length) * 100).toFixed(0)
                : 0;

        return (
            <div className={styles.page}>
                <Header />
                <main className={styles.hero}>
                    <div className={styles.tituloDiv}>
                        <h1 className={styles.title}>
                            {abaAtiva === 'EN' ? 'Quiz Completed!' : 'Simulado Concluído!'}
                        </h1>
                    </div>

                    <p style={{ textAlign: 'center', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                        {abaAtiva === 'EN'
                            ? `You got ${pontuacao} of ${questoesFiltradas.length} correct.`
                            : `Você acertou ${pontuacao} de ${questoesFiltradas.length} questões.`}
                    </p>
                    <p style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
                        {porcentagem}%
                    </p>

                    <div style={{ width: '100%' }}>
                        {questoesFiltradas.map((q, idx) => {
                            const respUser = respostas[q.id] || '—';
                            const acertou =
                                String(respUser).toUpperCase() === String(respostaCorreta(q)).toUpperCase();

                            return (
                                <div
                                    key={q.id}
                                    style={{
                                        padding: '15px',
                                        borderBottom: '1px solid #ddd',
                                        marginBottom: '10px',
                                        backgroundColor: acertou ? '#e8f5e9' : '#ffebee',
                                        borderRadius: '8px',
                                    }}>
                                    <p>
                                        <strong>{abaAtiva === 'EN' ? 'Question' : 'Questão'} {idx + 1}:</strong>{' '}
                                        {enunciado(q)}
                                    </p>
                                    <p style={{ margin: '5px 0 0' }}>
                                        👉 {abaAtiva === 'EN' ? 'Your answer' : 'Sua resposta'}:{' '}
                                        <strong style={{ color: acertou ? 'green' : 'red' }}>{respUser}</strong>
                                    </p>
                                    <p style={{ margin: '2px 0 0' }}>
                                        ✅ {abaAtiva === 'EN' ? 'Correct answer' : 'Gabarito'}:{' '}
                                        <strong style={{ color: 'green' }}>{respostaCorreta(q)}</strong>
                                    </p>
                                    <p style={{ fontStyle: 'italic', marginTop: '8px', fontSize: '0.9rem', color: '#555' }}>
                                        💡 {abaAtiva === 'EN' ? 'Explanation' : 'Explicação'}: {explicacao(q)}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    <div className={styles.divBotao} style={{ marginTop: '2rem' }}>
                        <button className={styles.buttonVa} onClick={reiniciarSimulado}>
                            <h3>{abaAtiva === 'EN' ? 'Retry' : 'Refazer Simulado'}</h3>
                        </button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    // ─── Tela principal ──────────────────────────────────────────────────────────
    return (
        <div className={styles.page}>
            <Header />
            <main className={styles.hero}>
                <div className={styles.tituloDiv}>
                    <h1 className={styles.title}>Simulado</h1>
                </div>

                <div className={styles.falaJesus}>
                    <div className={styles.divTextoJesus}>
                        <div className={styles.enunciado}>
                    <p>{questaoAtual && enunciado(questaoAtual)}</p>
                </div>
                <div style={{ width: '8rem'}}>
                        <p style={{ marginLeft: 10 }}>
                            {abaAtiva === 'EN' ? 'Question' : 'Questão'} {indiceAtual + 1}{' '}
                            {abaAtiva === 'EN' ? '/' : '/'} {questoesFiltradas.length}
                        </p>

                </div>
                    </div>
                </div>

                

                <div className={styles.divGrandeQuestoes}>
                    {questaoAtual &&
                        questaoAtual.alternativas.map((alt) => {
                            const selecionada = respostas[questaoAtual.id] === alt.id;
                            return (
                                <div
                                    key={alt.id}
                                    className={styles.questoes}
                                    onClick={() => selecionarAlternativa(alt.id)}
                                    style={{
                                        cursor: 'pointer',
                                        border: selecionada ? '2px solid #4CAF50' : '2px solid transparent',
                                        backgroundColor: selecionada ? '#e8f5e9' : '',
                                        borderRadius: '6px',
                                        transition: 'all 0.2s ease',
                                    }}>
                                    <p>
                                        <strong>({alt.id})</strong> {textoAlt(alt)}
                                    </p>
                                </div>
                            );
                        })}
                </div>

                <div className={styles.divBotao}>
                    <button
                        className={styles.buttonVa}
                        onClick={() => setIndiceAtual((prev) => Math.max(prev - 1, 0))}
                        disabled={indiceAtual === 0}>
                        <h3>{abaAtiva === 'EN' ? 'Back' : 'Voltar'}</h3>
                    </button>

                    {indiceAtual < questoesFiltradas.length - 1 ? (
                        <button
                            className={styles.buttonVa}
                            onClick={() => setIndiceAtual((prev) => Math.min(prev + 1, questoesFiltradas.length - 1))}>
                            <h3>{abaAtiva === 'EN' ? 'Next' : 'Avançar'}</h3>
                        </button>
                    ) : (
                        <button className={styles.buttonVa} onClick={finalizarSimulado}>
                            <h3>{abaAtiva === 'EN' ? 'Finish' : 'Finalizar'}</h3>
                        </button>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Simulados;
