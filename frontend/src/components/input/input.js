import React from "react";
import InputContainer from "../InputContainer/inputContainer";
import classes from "./input.module.css";

function input(
  { label, type, defaultValue, onChhange, onBlur, name, error },
  ref
) {
  const getErrorMessage = () => {
    if (!error) return;
    if (error.message) return error.message;

    switch (error.type) {
      case "required":
        return `${label} Es requerido`;
      case "minLength":
        return `${label} Es muy corto`;
      default:
        return "*";
    }
  };

  return (
    <InputContainer>
      <input
        defaultValue={defaultValue}
        className={classes.input}
        type={type}
        placeholder={label}
        ref={ref}
        name={name}
        onChange={onChhange}
        onBlur={onBlur}
        />
        {error && <div className={classes.error}>{getErrorMessage()}</div>}
    </InputContainer>
  )
}
export default React.forwardRef(input);
