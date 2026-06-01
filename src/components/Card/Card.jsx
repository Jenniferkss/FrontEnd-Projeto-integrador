import styles from './Card.module.css';

const Card = ({ titulo, imagem, descricao, frase }) => {
    return (
        <div className={styles.card}>
            <h3>{titulo}</h3>

            <div className={styles.imageBox}>
                <img src={imagem} alt={titulo} />
            </div>

            <div className={styles.description}>{descricao}</div>

            {frase && <div className={styles.quote}>{frase}</div>}
        </div>
    );
};

export default Card;
