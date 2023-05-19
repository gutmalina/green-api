import { createPortal } from "react-dom";
import styles from "./modal.module.css";
import {
  GREETING,
  ID_INSTANCE_PLACEHOLDER,
  API_INSTANCE_PLACEHOLDER,
  BTN_SIGN_IN,
  BTN_LOADER,
  ERROR_NOVALID_ACCAUNT,
} from "../../utils/constants";
import { useForm } from "../../hooks/useForm";
import api from "../../utils/api";
import { useEffect, useState } from "react";

const modalRoot = document.querySelector("#root-modal");

const Modal = ({ isOpen, setIsOpenModal, setUser }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [nameBtn, setNameBtn] = useState(BTN_SIGN_IN);
  const [error, setError] = useState("");
  const { values, setValues, handleChange } = useForm({
    idInstance: "",
    apiTokenInstance: "",
  });

  const handleSubmint = (e) => {
    e.preventDefault();
    setNameBtn(BTN_LOADER);
    api
      .getSettings(values.idInstance, values.apiTokenInstance)
      .then((res) => {
        setIsOpenModal(false);
        setUser({
          name: res.wid.slice(1, 11).concat(" (Вы)"),
          idInstance: values.idInstance,
          apiTokenInstance: values.apiTokenInstance,
        });
      })
      .catch((err) => {
        setError(ERROR_NOVALID_ACCAUNT);
      })
      .finally(() => {
        setNameBtn(BTN_SIGN_IN);
      });
  };

  const deleteIdInstance = () => {
    setValues({ idInstance: "" });
    setError("");
  };

  const deleteaAiTokenInstance = () => {
    setValues({ apiTokenInstance: "" });
    setError("");
  };

  useEffect(() => {
    if (values.idInstance && values.apiTokenInstance) {
      setIsDisabled(false);
    }
    setError("");
  }, [values]);

  if (!isOpen) {
    return null;
  } else {
    return createPortal(
      <section className={styles.wrapper}>
        <form className={styles.form} onSubmit={handleSubmint}>
          <h1 className={styles.greeting}>{GREETING}</h1>
          <fieldset className={styles.inputs}>
            <label className={styles.label}>
              <input
                id="idInstance"
                name="idInstance"
                className={styles.input}
                placeholder={ID_INSTANCE_PLACEHOLDER}
                onChange={handleChange}
                value={values.idInstance}
                maxLength={10}
              />
              <button
                type="button"
                className={styles.btn_delete}
                onClick={deleteIdInstance}
              ></button>
            </label>
            <label className={styles.label}>
              <input
                id="apiTokenInstance"
                name="apiTokenInstance"
                className={styles.input}
                placeholder={API_INSTANCE_PLACEHOLDER}
                onChange={handleChange}
                value={values.apiTokenInstance}
                maxLength={50}
              />
              <button
                type="button"
                className={styles.btn_delete}
                onClick={deleteaAiTokenInstance}
              ></button>
            </label>
          </fieldset>
          <span className={styles.error}>{error}</span>
          <button type="submit" className={styles.btn} disabled={isDisabled}>
            {nameBtn}
          </button>
        </form>
      </section>,
      modalRoot
    );
  }
};

export default Modal;
