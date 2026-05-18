import styles from './Footer.module.css';
const Footer = () => {
    return (
        <footer className={styles.footerBottom}>
            &copy; {new Date().getFullYear()} - Página dedicada à obra 'Quarto de Despejo: Diário de
            Uma Favelada' de Carolina Maria de Jesus. Todos os direitos reservados.
        </footer>
    );
};

export default Footer;
