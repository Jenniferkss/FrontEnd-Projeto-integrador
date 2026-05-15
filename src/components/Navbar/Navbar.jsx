import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>LOGO</div>
            <ul className={styles.links}>
                <li>
                    {' '}
                    <Link to="/">Home</Link>{' '}
                </li>
                <li>
                    {' '}
                    <Link to="/sobre">Sobre</Link>{' '}
                </li>
                <li>
                    {' '}
                    <Link to="servicos">Serviços</Link>{' '}
                </li>
                <li>
                    {' '}
                    <Link to="/contato">Contato</Link>{' '}
                </li>
                <li>
                    {' '}
                    <Link to="/Extra">Blog</Link>{' '}
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
