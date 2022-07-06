import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
const Pin = ({ length, onChange, demoOTP }) => {
  const inputRef = useRef([]);
  const [inputBoxLen, setInputBoxLen] = useState();
  const [inputValue, setInputValue] = useState(new Array(length).fill(""));

  const [status, setStatus] = useState();
  useEffect(() => {
    let arr = new Array(length).fill(1);
    setInputBoxLen(arr);
  }, [length]);
  let nextgoes = useRef(false);
  let count = useRef(0);
  const handleInput = (e, index) => {
    inputValue[index] = e.target.value;
    setInputValue(inputValue);
    if (e.target.value > 0 && index < length - 1) {
      if (nextgoes.current) {
        count.current = 0;

        nextgoes.current = false;
        inputRef.current[index + 1].focus();
      } else {
        count.current++;

        if (count.current === 3) {
          nextgoes.current = true;
        }
      }
    }
    onChange(inputValue.join(""));
    if (inputValue.join("") === demoOTP) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  };
  const handleKeyAction = (e, i) => {
    inputValue[i] = e.target.value;
    setInputValue(inputValue);
    if (e.keyCode === 8 || e.keyCode === 46) {
      handleBackSpace(e, i);
      // inputValue[i] = e.target.value = "";
      setInputValue(inputValue);
      setStatus(false);
    } else {
      handleInput(e, i);
    }
  };

  const handleBackSpace = (e, index) => {
    if (index > 0) {
if(inputRef.current[index].value===""){

  inputRef.current[index - 1].focus();
}
      
    }
    onChange(inputValue.join(""));
  };
  const handleOnPaste = (e) => {
    e.preventDefault();
    const data = e.clipboardData
      .getData("text")
      .split("")
      .filter((item, index) => index < length);
    data.forEach((value, index) => {
      inputValue[index] = value;
      inputRef.current[index].value = value;
      if (index < length - 1) {
        inputRef.current[index + 1].focus();
      }
    });
  };
  return (
    <div
      onPaste={handleOnPaste}
      style={{
        background: "#E8ECEF",
        margin: "0.5rem auto",
        borderRadius: "5px",
        padding: "2rem",
      }}
    >
      {inputBoxLen?.map((el, index) => {
        return (
          <input
            style={
              status
                ? {
                    outline: "1px solid #45934590 ",
                    background: "#45934590",
                    color: "green",
                  }
                : null
            }
            ref={(element) => {
              inputRef.current[index] = element;
            }}
            key={index}
            maxLength={4}
            onKeyUp={(e) => handleKeyAction(e, index)}
          />
        );
      })}
    </div>
  );
};
export default Pin;

Pin.propTypes = {
  length: PropTypes.number,
  onChange: PropTypes.func,
};
