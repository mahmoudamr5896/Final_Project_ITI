import React from "react";

function ButtonGr(props) {
  return (
    <button type="button" className="Butt" name={props.name}>
      {props.children}
    </button>
  );
}

export default ButtonGr;
