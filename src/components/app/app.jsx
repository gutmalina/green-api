import styles from "./app.module.css";
import Container from "../container/container";
import {
  CONTAINER_TYPE_CONTACTS,
  CONTAINER_TYPE_CHAT,
} from "../../utils/constants";
import { useEffect, useState } from "react";
import Modal from "../modal/modal";
import api from "../../utils/api";

const App = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [user, setUser] = useState({
    name: "",
    idInstance: "",
    apiTokenInstance: "",
  });
  const [adonentChat, setAbonentChat] = useState("");
  const [listAbonents, setListAbonents] = useState([]);
  const [listMessages, setListMessages] = useState([]);
  const [getMessage, setGetMessage] = useState("");

  useEffect(() => {
    setIsOpenModal(true);
  }, []);

  useEffect(() => {
    if (user.idInstance && user.apiTokenInstance) {
      setInterval(() => {
        api
          .receiveNotification(user.idInstance, user.apiTokenInstance)
          .then((res) => {
            if (res && res.body) {
              if (!res.body.messageData.extendedTextMessageData) {
                setGetMessage(res);
              }
              api
                .deleteNotification(
                  user.idInstance,
                  user.apiTokenInstance,
                  res.receiptId
                )
                .then()
                .catch((err) => console.log("err", err));
            }
          })
          .catch((err) => console.log("err", err));
      }, 15000);
    }
  }, [user]);

  useEffect(() => {
    if (
      getMessage &&
      !listMessages.some((item) => item.idMessage === getMessage.body.idMessage)
    ) {
      const handleTime = () => {
        const date = new Date(getMessage.body.timestamp * 1000);
        return `${date.getHours()}:${date.getMinutes()}`;
      };
      setListMessages((current) => [
        ...current,
        {
          sender: getMessage.body.senderData.chatId.slice(1, 11),
          text: getMessage.body.messageData,
          time: handleTime(),
          recipient: getMessage.body.instanceData.wid.slice(1, 11),
          idMessage: getMessage.body.idMessage,
          type: "get",
        },
      ]);
    }
  }, [getMessage, listMessages]);

  return (
    <>
      <header className={styles.header}></header>
      <section className={styles.lead}>
        <Container
          type={CONTAINER_TYPE_CONTACTS}
          name={user.name}
          listAbonents={listAbonents}
          setListAbonents={setListAbonents}
          setAbonentChat={setAbonentChat}
        />
        <Container
          type={CONTAINER_TYPE_CHAT}
          user={user}
          name={adonentChat}
          listMessages={listMessages}
          setListMessages={setListMessages}
          getMessage={getMessage}
          setGetMessage={setGetMessage}
        />
      </section>
      <Modal
        isOpen={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        setUser={setUser}
      />
    </>
  );
};

export default App;
