import styles from './card-abonent.module.css';

const CardAbonent = ({name, setAbonentChat}) => {

  const handleClick = () => {
    setAbonentChat(name)
  }

  return (
    <article className={styles.card_abonent} onClick={handleClick}>
      <article className={styles.container}>
        <div className={styles.card_img}></div>
        <div>{name}</div>
      </article>
      <div className={styles.card_border}></div>
    </article>
  )
};

export default CardAbonent;
