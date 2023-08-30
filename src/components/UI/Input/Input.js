import React, { useRef, useImperativeHandle } from "react";
import classes from "./Input.module.scss";

const Input = (
  { id, inputValue, isInputValid, onChangeEvent, onBlurEvent, children },
  ref
) => {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focus: activate,
    };
  });
  return (
    <div
      className={`${classes.control} ${
        isInputValid.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={id}>{children}</label>
      <input
        type={id}
        id={id}
        value={inputValue}
        onChange={onChangeEvent}
        onBlur={onBlurEvent}
        ref={inputRef}
      />
    </div>
  );
};

export default React.forwardRef(Input);
