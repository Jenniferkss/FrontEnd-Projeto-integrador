import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './video.module.css';

const VideoAulas = () => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.boxedLayout}>
                <Header />

                <main className={styles.hero}>
                    <h1 className={styles.title}>
                        Vídeo <br />
                        <span className={styles.italicTitle}>Aulas</span>
                    </h1>
                    <p className={styles.description}>
                        Assista a análises e discussões aprofundadas sobre as maiores obras da literatura brasileira.
                    </p>

                    <div className={styles.videoGrid}>
                        <div className={styles.videoCard}>
                            <div className={styles.videoWrapper}>
                                <iframe
                                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                    title="Vídeo Aula Carolina Maria de Jesus"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className={styles.videoFrame}
                                ></iframe>
                            </div>
                            <h3 className={styles.videoTitle}>Quarto de Despejo - Carolina Maria de Jesus</h3>
                            <p className={styles.videoDesc}>
                                Análise detalhada sobre os principais temas da obra, com ênfase no contexto social e literário.
                            </p>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
};

export default VideoAulas;
