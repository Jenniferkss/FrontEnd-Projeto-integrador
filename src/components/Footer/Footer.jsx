import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.brand}>
                    
                <h2 className={styles.brandTitle}> Intertexto </h2>

                <p className={styles.brandText}>
                    Aproximando os estudantes da literatura por meio de uma experiência moderna e
                    interativa.
                </p>
            </div>
            
            <div className={styles.nav}>
                <h3> Explorar:</h3>
                <ul>
                    <li>
                        <Link to="/">Início</Link>
                    </li>
                    <li>
                        <Link to="/Obra">Obra</Link>
                    </li>
                    <li>
                        <Link to="/Biblioteca">Biblioteca</Link>
                    </li>
                    <li>
                        <Link to="/Simulado">Simulado</Link>
                    </li>
                    <li>
                        <Link to="/Sobre">Sobre</Link>
                    </li>
                    <li>
                        <Link to="/Vestibular">Vestibular</Link>
                    </li>
                    <li>
                        <Link to="/Curiosidades">Curiosidades</Link>
                    </li>
                    <li>
                        <Link to="/VideoAulas">Vídeo Aulas</Link>
                    </li>
                </ul>
            </div>

            <div className={styles.contact}>
                <h3>Contato:</h3>

                <p>E-mail</p>
                <a href="mailto:intertexto@gmail.com" className={styles.contactLink}>
                    intertexto@gmail.com
                </a>

                <p>Telefone</p>
                <a href="tel:19971502812" className={styles.contactLink}>
                    19971502812
                </a>

                <p>Endereço</p>
                <a
                    href="https://maps.app.goo.gl/jmxEdxsFVqoz3FaK7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.contactLink}>
                    Av. Faria Lima, 1983 - São Paulo
                </a>
            </div>
        </div>

            <hr className={styles.divider} />

            <div className={styles.bottomBar}>
                <p>© 2026 Intertexto - Todos os direitos reservados</p>
            </div>
        </footer>
    );
}

export default Footer;
