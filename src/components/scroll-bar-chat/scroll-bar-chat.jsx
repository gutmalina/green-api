import styles from "./scroll-bar-chat.module.css";
import Message from "../message/message";

const ScrollBarChat = ({ listMessages }) => {

  return (
    <div className={styles.scroll_bar_chat}>
      {listMessages.length > 0
        ? listMessages.map((item) => (
            <Message key={item.idMessage} message={item}/>
          ))
        : null}
    </div>
  );
};

export default ScrollBarChat;
