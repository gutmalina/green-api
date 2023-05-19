import styles from "./message.module.css";

const Message = ({ message }) => {
  const text =
    message.type === "get"
      ? `${message.text.textMessageData.textMessage}`
      : `${message.text}`;
  const classNameContainer =
    message.type === "get"
      ? `${styles.container} ${styles.container_type_get}`
      : `${styles.container} ${styles.container_type_send}`;

  return (
    <div className={classNameContainer}>
      <p className={styles.text_message}>{text}</p>
      <p className={styles.date}>{message.time}</p>
    </div>
  );
};

export default Message;
