import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './Vestibular.module.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer.jsx'
import { useLanguage } from '../../context/LanguageContext.jsx'
import fieldsMap from '../../mapeamento/mapeamento'

export default function ObraVestibular() {
  const [dados, setDados] = useState([])
  const [carregando, setCarregando] = useState(true)
  const { t, mapFields, selectField } = useLanguage()
  const localized = dados ? mapFields(dados, fieldsMap.vestibular) : {}

  useEffect(() => {
    const carregarLivros = async () => {
      try {
        const response = await fetch(
          'https://backend-projeto-integrador-rana.onrender.com/api/dicaVestibular',
          {
            method: 'GET',
            headers: {
              'x-api-key': 'amods',
              'Content-Type': 'application/json',
            },
          }
        )

        if (!response.ok) {
          const errorText = await response.text()
          console.error('Erro retornado pelo servidor:', errorText)
          throw new Error(`Erro ${response.status} ao buscar dados.`)
        }

        const data = await response.json()
        console.debug('Vestibular - raw data from API:', data)
        const processed = Array.isArray(data) ? data[0] : data
        console.debug('Vestibular - processed dados:', processed)
        setDados(processed)
      } catch (error) {
        console.error('Erro ao conectar com o back-end:', error)
      } finally {
        setCarregando(false)
      }
    }

    carregarLivros()
  }, [])

  if (carregando) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', fontSize: '18px' }}>
        {t('loading_database')}
      </div>
    )
  }

  if (!dados || dados.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', fontSize: '18px' }}>
        {t('no_records')}
      </div>
    )
  }

  // Pega o primeiro registro do banco
  const livro = dados[0]

  // Lógica para garantir que Interpretações tenha conteúdo caso a coluna mude de nome ou venha vazia
  // Lógica para garantir que Interpretações tenha conteúdo caso a coluna mude de nome ou venha vazia
  const obterInterpretacao = () => {
    if (language === 'en') {
      // Removido o "|| livro?.conteudoEn"
      return (
        livro?.interpretacoesEn ||
        livro?.interpretacaoEn ||
        'No analysis available.'
      )
    }
    // Removido o "|| livro?.conteudoPt"
    return (
      livro?.interpretacoesPt ||
      livro?.interpretacaoPt ||
      'Nenhuma análise disponível.'
    )
  }

  return (
    <div className={styles.pageContainer}>
      <Header />

      <div className={styles.contentWrapper}>
        <header className={styles.mainHeader}>
          <p className={styles.kicker}>{t('vest_kicker')}</p>

          <h1 className={styles.headerTitle}>{t('vest_headerTitle')}</h1>

          <p className={styles.lead}>{t('vest_lead')}</p>
        </header>

        {/* GRID SUPERIOR */}
        <section className={styles.topCardsGrid}>
          <div className={`${styles.cardTop} ${styles.cardRedBorder}`}>
            <h2 className={styles.cardTopTitle}>{t('vest_card_critical')}</h2>
            <p className={styles.cardTopText}>
              {localized.analiseCritica || t('unavailable')}
            </p>
          </div>

          <div className={`${styles.cardTop} ${styles.cardRedBorder}`}>
            <h2 className={styles.cardTopTitle}>{t('vest_card_interpret')}</h2>
            <p className={styles.cardTopText}>
              {localized.interpretacoes || t('unavailable')}
            </p>
          </div>

          <div className={`${styles.cardTop} ${styles.cardRedBorder}`}>
            <h2 className={styles.cardTopTitle}>
              {t('vest_card_essayTopics')}
            </h2>
            <ul className={styles.cardTopList}>
              {Array.isArray(localized.temasRedacao) ? (
                localized.temasRedacao.map((tema, index) => (
                  <li key={index}>{tema}</li>
                ))
              ) : (
                <>
                  <li>{t('essay_topic1')}</li>
                  <li>{t('essay_topic2')}</li>
                  <li>{t('essay_topic3')}</li>
                </>
              )}
            </ul>
          </div>
        </section>

        {/* PARTE INFERIOR */}
        <div className={styles.mainLayout}>
          <main className={styles.contentBox}>
            <h2 className={styles.contentTitle}>
              {selectField(dados, 'titulo') ||
                localized.tituloPrincipal ||
                t('vest_default_title')}
            </h2>

            <p className={styles.contentText}>
              {selectField(dados, 'conteudo') ||
                selectField(dados, 'texto') ||
                localized.textoPrincipal ||
                localized.resumo ||
                t('content_unavailable')}
            </p>

            {/* Bloco de Citação Puro vindo do Banco */}
            {livro?.citacao && (
              <blockquote className={styles.quoteBlock}>
                <div className={styles.quoteLine}></div>
                <p className={styles.quoteText}>“{livro.citacao}”</p>
              </blockquote>
            )}

            <h3 className={styles.vectorsTitle}>{t('key_vectors')}</h3>

            <div className={styles.vectorListContainer}>
              {dados.contextoHist ? (
                <p className={styles.contentText}>{localized.contextoHist}</p>
              ) : (
                // Fallback Completo
                <div className={styles.vectorListFallback}>
                  <p>
                    <strong>{t('vector1_title')}</strong> {t('vector1_text')}
                  </p>
                  <p>
                    <strong>{t('vector2_title')}</strong> {t('vector2_text')}
                  </p>
                  <p>
                    <strong>{t('vector3_title')}</strong> {t('vector3_text')}
                  </p>
                </div>
              )}
            </div>

            {dados.personagens && (
              <div>
                <h3 className={styles.vectorsTitle}>{t('main_characters')}</h3>
                <p className={styles.contentText}>{localized.personagens}</p>
              </div>
            )}
          </main>

          {/* SIDEBAR */}
          <div className={styles.sidebar}>
            <div className={styles.videoBtnWrapper}>
              <Link to='/videoAulas'>
                <button className={styles.videoBtn}>
                  <FaPlayCircle />
                  {t('watch_video_classes')}
                </button>
              </Link>
            </div>

            <div className={styles.statsCard}>
              <h3 className={styles.statsTitle}>{t('exam_frequency')}</h3>

              <div className={styles.progressGroup}>
                {(
                  livro?.estatisticas || [
                    { nome: 'Fuvest', porcentagem: 30 },
                    { nome: 'Unicamp', porcentagem: 72 },
                    { nome: 'ENEM', porcentagem: 42 },
                  ]
                ).map((est, index) => (
                  <div key={index} className={styles.statsItem}>
                    <div className={styles.progressLabels}>
                      <p>{est.nome}</p>
                      <p>{est.porcentagem}%</p>
                    </div>
                    <div className={styles.progressBg}>
                      <div
                        className={styles.progressBar}
                        style={{ width: `${est.porcentagem}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
