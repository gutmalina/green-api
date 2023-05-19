import styles from "./scroll-bar-contact.module.css";
import CardAbonent from "../card-abonent/card-abonent";

const ScrollBarContact = ({ listAbonents, setAbonentChat }) => {

  return (
    <div className={styles.scroll_bar_contact}>
      {listAbonents.length > 0
        ? listAbonents.map((abonent) => (
            <CardAbonent key={abonent.chatId} name={abonent.chatId} setAbonentChat={setAbonentChat} />
          ))
        : null}
    </div>
  );
};

export default ScrollBarContact;
