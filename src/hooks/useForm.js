import { useState} from "react";

export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);

  /** изменения в input */
  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  return {
    values,
    setValues,
    handleChange
  };
}
