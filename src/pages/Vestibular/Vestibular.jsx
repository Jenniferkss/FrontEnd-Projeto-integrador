import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Vestibular.module.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer.jsx'
import { FaPlayCircle } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext.jsx'

export default function Vestibular() {
  const [conteudo, setConteudo] = useState(null)
  const [dicas, setDicas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { language, selectField } = useLanguage()

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true)
        setError(null)

        const [resConteudo, resDicas] = await Promise.all([
          fetch(
            'https://backend-projeto-integrador-rana.onrender.com/api/conteudoVestibular?livroId=6',
            { headers: { 'x-api-key': 'amods' } }
          ),
          fetch(
            'https://backend-projeto-integrador-rana.onrender.com/api/dicaVestibular?livroId=6',
            { headers: { 'x-api-key': 'amods' } }
          )
        ])

        if (!resConteudo.ok) {
          throw new Error(language === 'en' ? 'Error fetching exam content' : 'Erro ao buscar conteúdo do vestibular')
        }

        if (!resDicas.ok) {
          throw new Error(language === 'en' ? 'Error fetching tips' : 'Erro ao buscar dicas')
        }

        const jsonConteudo = await resConteudo.json()
        const dadosConteudo = jsonConteudo.data || jsonConteudo

        const jsonDicas = await resDicas.json()
        const listaDicas = Array.isArray(jsonDicas)
          ? jsonDicas
          : jsonDicas.data || []

        setConteudo(dadosConteudo)
        setDicas(listaDicas.slice(0, 4))
      } catch (err) {
        console.error('Erro ao carregar dados:', err)
        setError(language === 'en' ? 'Could not load exam data.' : 'Não foi possível carregar os dados do vestibular.')
      } finally {
        setLoading(false)
      }
    }

    carregarDados()
  }, [language])

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px' }}>
        {language === 'en' ? 'Loading exam content...' : 'Carregando conteúdo do vestibular...'}
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '80px', color: '#c0392b' }}>
        {error}
      </div>
    )
  }

  if (!conteudo) {
    return (
      <div style={{ textAlign: 'center', padding: '80px' }}>
        {language === 'en' ? 'No content found.' : 'Nenhum conteúdo encontrado.'}
      </div>
    )
  }

  return (
    <div className={styles.pageContainer}>
      <Header />

      <div className={styles.contentWrapper}>
              <section className={styles.banner}>
                            <p className={styles.kicker}>{language === 'en' ? 'Critical Analysis' : 'Análise crítica'}</p>
                            <h1 className={styles.titulo}>{language === 'en' ? 'The Work in Exams' : 'A obra no vestibular'}</h1>
                            <p className={styles.subtitulo}>
                            {language === 'en' ? 'Prepare for exams in a practical and efficient way.' : 'Prepare-se para o vestibular de forma prática e eficiente.'}
                            </p>
              </section>

        <section className={styles.topCardsGrid}>
          <div className={`${styles.cardTop} ${styles.cardRedBorder}`}>
            <h2 className={styles.cardTopTitle}>{language === 'en' ? 'Critical Analysis' : 'Análise crítica'}</h2>
            <p className={styles.cardTopText}>
              {selectField(conteudo, 'analiseCritica') || (language === 'en' ? 'Critical analysis not available.' : 'Análise crítica não disponível.')}
            </p>
          </div>

          <div className={`${styles.cardTop} ${styles.cardRedBorder}`}>
            <h2 className={styles.cardTopTitle}>{language === 'en' ? 'Interpretations and Analysis' : 'Interpretações e análises'}</h2>
            <p className={styles.cardTopText}>
              {selectField(conteudo, 'interpretacoes') || (language === 'en' ? 'Interpretations not available.' : 'Interpretações não disponíveis.')}
            </p>
          </div>

          <div className={`${styles.cardTop} ${styles.cardRedBorder}`}>
            <h2 className={styles.cardTopTitle}>
              {language === 'en' ? 'Possible Essay Topics' : 'Possíveis temas para redação'}
            </h2>
            <ul className={styles.cardTopList}>
              {(selectField(conteudo, 'temasRedacao') || []).length > 0 ? (
                (selectField(conteudo, 'temasRedacao') || []).map((tema, index) => (
                  <li key={index}>{tema}</li>
                ))
              ) : (
                <li>{language === 'en' ? 'No topics registered yet.' : 'Nenhum tema cadastrado ainda.'}</li>
              )}
            </ul>
          </div>
        </section>

        <div className={styles.mainLayout}>
          <main className={styles.contentBox}>
            <h2 className={styles.contentTitle}>
              {selectField(conteudo, 'tituloPrincipal') ||
                (language === 'en' ? 'The Dual Perspective: Carolina vs. the Reader' : 'A Dupla Perspectiva: Carolina vs. o Leitor')}
            </h2>

            <p className={styles.contentText}>
              {selectField(conteudo, 'textoPrincipal') ||
                (language === 'en' ? 'Main content not available.' : 'Conteúdo principal não disponível.')}
            </p>

            {conteudo.citacao && (
              <blockquote className={styles.quoteBlock}>
                <div className={styles.quoteLine}></div>
                <p className={styles.quoteText}>"{conteudo.citacao}"</p>
              </blockquote>
            )}

            <h3 className={styles.vectorsTitle}>{language === 'en' ? 'Key Analytical Vectors' : 'Vetores Analíticos Chave'}</h3>
            <div className={styles.vectorListContainer}>
              {[1, 2, 3].map(num => {
                const titulo = selectField(conteudo, `vetor${num}Titulo`)
                const texto = selectField(conteudo, `vetor${num}Texto`)
                return titulo ? (
                  <p key={num} className={styles.contentText}>
                    <strong>{titulo}</strong> {texto}
                  </p>
                ) : null
              })}
            </div>
          </main>

          <div className={styles.sidebar}>
            <Link to='/videoAulas' className={styles.videoBtn}>
              < FaPlayCircle /> {language === 'en' ? 'Watch video lessons' : 'Ver as vídeo-aulas'}
            </Link>

            <div className={styles.statsCard}>
              <h3 className={styles.statsTitle}>{language === 'en' ? 'Exam Frequency' : 'Frequência nos vestibulares'}</h3>
              <div className={styles.progressGroup}>
                {[
                  { nome: 'Fuvest', value: conteudo.frequenciaFuvest ?? 30 },
                  { nome: 'Unicamp', value: conteudo.frequenciaUnicamp ?? 72 },
                  { nome: 'ENEM', value: conteudo.frequenciaEnem ?? 42 },
                ].map((item, index) => (
                  <div key={index} className={styles.statsItem}>
                    <div className={styles.progressLabels}>
                      <span>{item.nome}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className={styles.progressBg}>
                      <div
                        className={styles.progressBar}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {dicas.length > 0 && (
          <section className={styles.dicasSection}>
            <h2 className={styles.dicasTitle}>{language === 'en' ? 'Exam Tips' : 'Dicas para o Vestibular'}</h2>
            <div className={styles.dicasGrid}>
              {dicas.map((dica, index) => (
                <div key={index} className={styles.dicaCard}>
                  <h4>{selectField(dica, 'titulo')}</h4>
                  <p>{selectField(dica, 'conteudo')}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  )
}
