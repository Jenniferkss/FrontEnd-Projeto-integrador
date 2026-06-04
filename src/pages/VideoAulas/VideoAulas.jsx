import { useEffect, useState, useCallback } from 'react'
import Header from '../../components/Header/Header.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import { request } from '../../services/api.js'
import styles from './video.module.css'

const API_ENDPOINT = '/api/videoaula'
const API_KEY = import.meta.env.VITE_API_KEY ?? 'amods'

/** Extrai o ID de um vídeo do YouTube a partir de qualquer formato de URL */
const getYouTubeId = (url) => {
  if (!url) return ''
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&\n?#]+)/
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match?.[1]) return match[1]
  }
  return ''
}

/** Formata URL para embed */
const formatYouTubeUrl = (url) => {
  const id = getYouTubeId(url)
  return id ? `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1` : url
}

/** Gera URL da thumbnail */
const getThumbUrl = (url) => {
  const id = getYouTubeId(url)
  return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : ''
}

/** Marcação de aula assistida - localStorage */
const WATCHED_KEY = 'videoaulas_assistidas'

const getWatched = () => {
  try {
    return JSON.parse(localStorage.getItem(WATCHED_KEY) || '[]')
  } catch {
    return []
  }
}

const toggleWatched = (id) => {
  const watched = getWatched()
  const idx = watched.indexOf(id)
  if (idx >= 0) watched.splice(idx, 1)
  else watched.push(id)
  localStorage.setItem(WATCHED_KEY, JSON.stringify(watched))
  return watched
}

export default function VideoAulas() {
  const [videos, setVideos] = useState([])
  const [videoAtivo, setVideoAtivo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cinemaMode, setCinemaMode] = useState(false)
  const [watched, setWatched] = useState(getWatched)
  const [mobilePlaylistOpen, setMobilePlaylistOpen] = useState(false)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true)
        const data = await request(API_ENDPOINT, {
          headers: { 'x-api-key': API_KEY },
        })
        if (Array.isArray(data)) {
          setVideos(data)
          if (data.length > 0) setVideoAtivo(data[0])
        }
      } catch (err) {
        console.error('Erro ao carregar vídeos:', err)
        setError('Não foi possível carregar as videoaulas.')
      } finally {
        setLoading(false)
      }
    }
    fetchVideos()
  }, [])

  const handleSelectVideo = useCallback((video) => {
    setVideoAtivo(video)
    setMobilePlaylistOpen(false)
    // Marca como assistido
    const updated = toggleWatched(video.id)
    setWatched(updated)
  }, [])

  const handleShare = useCallback(async () => {
    if (!videoAtivo) return
    const url = `${window.location.origin}${window.location.pathname}?video=${videoAtivo.id}`
    try {
      await navigator.clipboard.writeText(url)
      alert('✅ Link copiado!')
    } catch {
      // fallback
      const input = document.createElement('input')
      input.value = url
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      alert('✅ Link copiado!')
    }
  }, [videoAtivo])

  // Restaurar vídeo da URL se houver ?video=ID
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const videoId = params.get('video')
    if (videoId && videos.length > 0) {
      const found = videos.find(v => String(v.id) === videoId)
      if (found) setVideoAtivo(found)
    }
  }, [videos])

  if (loading) return (
    <div className={styles.page}>
      <Header />
      <div className={styles.container}>
        <div className={styles.skeletonList}>
          {[1, 2, 3].map(i => (
            <div key={i} className={styles.skeletonCard}>
              <div className={styles.skelThumb} />
              <div className={styles.skelText}>
                <div className={styles.skelLine} style={{ width: '70%' }} />
                <div className={styles.skelLine} style={{ width: '40%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )

  return (
    <div className={`${styles.page} ${cinemaMode ? styles.cinemaPage : ''}`}>
      <Header />

      <main className={`${styles.container} ${cinemaMode ? styles.cinemaContainer : ''}`}>
        <header className={styles.pageHeader}>
          <h1>Vídeo Aulas</h1>
          <p>Explore análises e conteúdos sobre Quarto de Despejo</p>
        </header>

        {error ? (
          <div className={styles.errorMsg}>{error}</div>
        ) : (
          <div className={`${styles.mainGrid} ${cinemaMode ? styles.mainGridCinema : ''}`}>
            {/* Player Principal */}
            <section className={`${styles.playerSection} ${cinemaMode ? styles.playerSectionCinema : ''}`}>
              {videoAtivo ? (
                <>
                  <div className={`${styles.playerWrapper} ${cinemaMode ? styles.playerWrapperCinema : ''}`}>
                    <div className={styles.aspectRatio}>
                      <iframe
                        src={formatYouTubeUrl(videoAtivo.urlMidia)}
                        title={videoAtivo.tituloPt}
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                      />
                    </div>
                    {/* Barra de ações */}
                    <div className={styles.playerActions}>
                      <button
                        className={styles.actionBtn}
                        onClick={() => setCinemaMode(p => !p)}
                        title={cinemaMode ? 'Sair do modo cinema' : 'Modo cinema'}
                      >
                        {cinemaMode ? '⛶ Sair' : '⛶ Cinema'}
                      </button>
                      <button
                        className={styles.actionBtn}
                        onClick={handleShare}
                        title='Compartilhar este vídeo'
                      >
                        🔗 Compartilhar
                      </button>
                    </div>
                  </div>
                  <div className={styles.videoDetails}>
                    <h2>{videoAtivo.tituloPt}</h2>
                    <p>{videoAtivo.descricaoPt}</p>
                  </div>
                </>
              ) : (
                <div className={styles.noVideo}>Nenhum vídeo selecionado</div>
              )}
            </section>

            {/* Playlist Lateral */}
            <aside className={`${styles.playlistSection} ${cinemaMode ? styles.playlistSectionCinema : ''}`}>
              {/* Botão toggle para mobile */}
              <button
                className={styles.playlistToggle}
                onClick={() => setMobilePlaylistOpen(p => !p)}
              >
                <span>Lista de Aulas ({videos.length})</span>
                <span className={styles.toggleArrow}>{mobilePlaylistOpen ? '▲' : '▼'}</span>
              </button>

              <div className={`${styles.playlistScroll} ${mobilePlaylistOpen ? styles.playlistOpen : ''}`}>
                {videos.map(video => {
                  const isWatched = watched.includes(video.id)
                  return (
                    <button
                      key={video.id}
                      className={`${styles.playlistItem} ${videoAtivo?.id === video.id ? styles.active : ''} ${isWatched ? styles.watched : ''}`}
                      onClick={() => handleSelectVideo(video)}
                    >
                      <div className={styles.itemThumb}>
                        <img
                          src={getThumbUrl(video.urlMidia)}
                          alt={video.tituloPt}
                          loading='lazy'
                        />
                        {isWatched && <span className={styles.watchedBadge}>✓</span>}
                      </div>
                      <div className={styles.itemInfo}>
                        <h4>{video.tituloPt}</h4>
                      </div>
                    </button>
                  )
                })}
              </div>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}