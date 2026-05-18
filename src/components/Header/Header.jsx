import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const links = [
    { to: '/', label: 'Inicio', end: true },
    { to: '/obra', label: 'Obra' },
    { to: '/simulados', label: 'Simulado' },
    { to: '/sobre', label: 'Sobre' },
    { to: '/vestibular', label: 'Vestibular' },
    { to: '/curiosidades', label: 'Curiosidades' },
];

const Header = () => {
    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logoGroup}>
                <svg
                    className={styles.bookIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                <span className={styles.brand}>Intertexto</span>
            </Link>

            <nav className={styles.nav}>
                <ul className={styles.menu}>
                    {links.map((link) => (
                        <li key={link.to} className={styles.menuItem}>
                            <NavLink
                                to={link.to}
                                end={link.end}
                                className={({ isActive }) =>
                                    isActive
                                        ? `${styles.navLink} ${styles.navLinkActive}`
                                        : styles.navLink
                                }>
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className={styles.actions}>
                <div className={styles.languageSwitcher} aria-label="Selecao de idioma">
                    <button type="button" className={styles.languageButton} aria-label="Português">
                        <span className={styles.flag} aria-hidden="true">
                            BR
                        </span>
                        <span>PT</span>
                    </button>
                    <button type="button" className={styles.languageButton} aria-label="English">
                        <span className={styles.flag} aria-hidden="true">
                            US
                        </span>
                        <span>EN</span>
                    </button>
                </div>

                <svg
                    className={styles.searchIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </div>
        </header>
    );
};

export default Header;
