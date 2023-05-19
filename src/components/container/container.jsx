import styles from "./container.module.css";
import CardUser from "../card-user/card-user";
import ScrollBarContact from "../scroll-bar-contact/scroll-bar-contact";
import ScrollBarChat from "../scroll-bar-chat/scroll-bar-chat";
import {
  CONTAINER_TYPE_CHAT,
  CONTAINER_TYPE_CONTACTS,
  MESSAGE_PLACEHOLDER,
  ABONENT_PLACEHOLDER,
  ERROR_ABONENT,
  ERROR_NUMBER_ABONENT
} from "../../utils/constants";
import { useForm } from "../../hooks/useForm";
import api from "../../utils/api";
import { useEffect, useState } from "react";

const Container = ({
  type,
  name,
  user,
  listAbonents,
  setListAbonents,
  setAbonentChat,
  listMessages,
  setListMessages
}) => {
  const [error, setError] = useState("");
  const { values, handleChange, setValues } = useForm(
    { message: "", abonent: "" }
  );
  const [renderListMessage, setRenderListMessage] = useState([]);

  /** фильтр сообщений при изменении чата */
  useEffect(() => {
    if(listMessages){
      const arr = listMessages.filter((item) => {
          if (item.type === "get") {
            return item.sender === name;
          } else {
            return item.recipient === name;
          }
        })
      setRenderListMessage(arr)
    }
  }, [listMessages, name, user]);

  const handleSubmint = (e) => {
    e.preventDefault();
    if (values.message && name) {
      api
        .sendMessage(
          user.idInstance,
          user.apiTokenInstance,
          "7".concat(name.concat("@c.us")),
          values.message
        )
        .then((res) => {
          const date = new Date();
          setListMessages((current) => [
            ...current,
            {
              sender: user.name.slice(0, 10),
              text: values.message,
              time: `${date.getHours()}:${date.getMinutes()}`,
              recipient: name,
              idMessage: res.idMessage,
              type: "send",
            },
          ]);
          setValues({message: ""})
        })
        .catch((err) => console.log("err", err));
    }
  };

  const addAbonent = (e) => {
    e.preventDefault()
    if (values.abonent && !(isNaN(values.abonent))) {
      if (!listAbonents.find((item) => item.chatId === values.abonent)) {
        setListAbonents((current) => [...current, { chatId: values.abonent }]);
        setValues({ abonent: "" });
      }else{
        setError(ERROR_ABONENT)
      }
    }else{
      setError(ERROR_NUMBER_ABONENT)
    }
  };

  const deleteAbonent = () => {
    setValues({ abonent: "" });
    setError("");
  };

  const deleteMessage = () => {
    setValues({message: ""})
  };

  const classNameContainer =
    type === CONTAINER_TYPE_CHAT
      ? `${styles.container} ${styles.container_type_chat}`
      : `${styles.container}`;

  return (
    <section className={classNameContainer}>
      <CardUser name={name}/>
      {type === CONTAINER_TYPE_CONTACTS ? (
        <>
          <form className={styles.abonent_form} onSubmit={addAbonent}>
            <input
              className={styles.abonent_input}
              id="abonent"
              name="abonent"
              placeholder={ABONENT_PLACEHOLDER}
              onChange={handleChange}
              value={values.abonent}
              maxLength={10}
            />
            <button
              type="button"
              className={styles.abonent_btn_add}
              onClick={addAbonent}
            ></button>
            <button
              type="button"
              className={styles.abonent_btn_delete}
              onClick={deleteAbonent}
            ></button>
          </form>
          <span className={styles.error}>{error}</span>
          <ScrollBarContact
            listAbonents={listAbonents}
            setAbonentChat={setAbonentChat}
          />
        </>
      ) : null}
      {type === CONTAINER_TYPE_CHAT ? (
        <>
          <ScrollBarChat listMessages={renderListMessage} />
          <form className={styles.form} onSubmit={handleSubmint}>
            <input
              id="message"
              name="message"
              className={styles.input}
              placeholder={MESSAGE_PLACEHOLDER}
              onChange={handleChange}
              value={values.message}
            />
            <button className={styles.btn} type="submit"></button>
            <button
              type="button"
              className={styles.abonent_btn_delete}
              onClick={deleteMessage}
            ></button>
          </form>
        </>
      ) : null}
    </section>
  );
};

export default Container;
