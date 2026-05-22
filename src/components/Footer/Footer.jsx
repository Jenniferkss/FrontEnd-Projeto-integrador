import { useLanguage } from '../../context/LanguageContext.jsx';
import styles from './Footer.module.css';

const copy = {
    pt: "Página dedicada à obra 'Quarto de Despejo: Diário de Uma Favelada' de Carolina Maria de Jesus. Todos os direitos reservados.",
    en: "Page dedicated to 'Child of the Dark: The Diary of Carolina Maria de Jesus'. All rights reserved.",
};

const Footer = () => {
    const { language } = useLanguage();

    return (
        <footer className={styles.footerBottom}>
            &copy; {new Date().getFullYear()} - {copy[language]}
        </footer>
    );
};

export default Footer;
