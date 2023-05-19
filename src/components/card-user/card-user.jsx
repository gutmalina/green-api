import styles from './card-user.module.css';

const CardUser = ({name}) => {
  return (
    <article className={styles.card_user}>
      <div className={styles.card_img}></div>
      <div>{name}</div>
    </article>
  )
};

export default CardUser;
