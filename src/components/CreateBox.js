import React, { useState } from "react";
import styled from "react-emotion";

const CreateBox = ({ onSubmit, disabled }) => {
  const [value, setValue] = useState("");

  const handleValueChange = e => {
    setValue(e.target.value);
  };

  const handleEnter = e => {
    if (e.keyCode === 13 && value !== "") {
      onSubmit(value);
      setValue("");
    }
  };

  return (
    <Wrapper>
      <Input
        value={value}
        onChange={handleValueChange}
        onKeyDown={handleEnter}
        disabled={disabled}
        placeholder={disabled ? "Please log in to use" : "List an item and press [Enter]"  }
      />
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  display: "flex",
  width: "100%",
  justifyContent: "center",
  marginTop: 30,
  marginBottom: 30,
  '@media (max-width: 700px)': {
    padding: '0px 10px'
  }
});

const Input = styled("input")({
  width: 390,
  height: 60,
  borderRadius: 6,
  padding: 10,
  fontSize: 20,
  border: "3px solid rgb(218, 218, 218)",
  "&:focus": {
    outline: "none",
    borderColor: "rgb(27, 148, 247)"
  }
});

export default CreateBox;
