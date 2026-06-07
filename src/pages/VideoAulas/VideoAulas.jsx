import { useEffect, useState } from 'react'
import Header from '../../components/Header/Header.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import { request } from '../../services/api.js'
import styles from './video.module.css'

const API_KEY = import.meta.env.VITE_API_KEY ?? 'amods'

function getYoutubeEmbedUrl(url) {
  if (!url) return ''

  let videoId = ''

  if (url.includes('youtube.com/watch?v=')) {
    videoId = url.split('v=')[1].split('&')[0]
  } else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1].split('?')[0]
  } else if (url.includes('youtube.com/shorts/')) {
    videoId = url.split('shorts/')[1].split('?')[0]
  } else if (url.includes('youtube.com/embed/')) {
    videoId = url.split('embed/')[1].split('?')[0]
  }

  return videoId ? `https://www.youtube.com/embed/${videoId}` : url
}

function getYoutubeThumbnail(url) {
  if (!url) return ''

  let videoId = ''

  if (url.includes('youtube.com/watch?v=')) {
    videoId = url.split('v=')[1].split('&')[0]
  } else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1].split('?')[0]
  } else if (url.includes('youtube.com/shorts/')) {
    videoId = url.split('shorts/')[1].split('?')[0]
  } else if (url.includes('youtube.com/embed/')) {
    videoId = url.split('embed/')[1].split('?')[0]
  }

  return videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : ''
}

export default function VideoAulas() {
  const [videos, setVideos] = useState([])
  const [videoAtivo, setVideoAtivo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    async function carregarVideos() {
      try {
        const data = await request('/api/videoaula', {
          headers: { 'x-api-key': API_KEY },
        })

        if (Array.isArray(data) && data.length > 0) {
          setVideos(data)
          setVideoAtivo(data[0])
        }
      } catch (error) {
        console.error('Erro ao carregar videoaulas:', error)
        setErro('Não foi possível carregar as videoaulas.')
      } finally {
        setLoading(false)
      }
    }

    carregarVideos()
  }, [])

  if (loading) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.loading}>Carregando videoaulas...</div>
        <Footer />
      </div>
    )
  }

  if (erro) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.loading}>{erro}</div>
        <Footer />
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <section className={styles.banner}>
          <p className={styles.kicker}>Vídeo Aulas</p>
          <h1 className={styles.titulo}>Aprenda assistindo</h1>
          <p className={styles.subtitulo}>Análises e conteúdos em vídeo.</p>
        </section>

        <div className={styles.layout}>
          <section className={styles.player}>
            {videoAtivo && (
              <>
                <div className={styles.videoWrap}>
                  <iframe
                    src={getYoutubeEmbedUrl(videoAtivo.urlMidia)}
                    title={videoAtivo.tituloPt}
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                  />
                </div>

                <div className={styles.playerInfo}>
                  <h2 className={styles.videoTitulo}>{videoAtivo.tituloPt}</h2>
                  {videoAtivo.descricaoPt && (
                    <p className={styles.videoDesc}>{videoAtivo.descricaoPt}</p>
                  )}
                </div>
              </>
            )}
          </section>

          <aside className={styles.playlist}>
            <h3 className={styles.playlistTitulo}>Aulas ({videos.length})</h3>

            <div className={styles.playlistScroll}>
              {videos.map(video => (
                <button
                  key={video.id}
                  className={`${styles.item} ${video.id === videoAtivo?.id ? styles.itemAtivo : ''}`}
                  onClick={() => setVideoAtivo(video)}
                >
                  <div className={styles.itemThumb}>
                    <img
                      src={getYoutubeThumbnail(video.urlMidia)}
                      alt={video.tituloPt}
                      loading='lazy'
                    />
                  </div>
                  <span className={styles.itemTitulo}>{video.tituloPt}</span>
                </button>
              ))}
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}
