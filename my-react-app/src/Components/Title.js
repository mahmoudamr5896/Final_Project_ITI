import React from "react";
import '../CSS/CardCustom.css'; 

function Title(props) {
  return (
    <>
    <center>
    <h1 name={props.name} className="PageTitle"> 
      {props.children}
    </h1>
    </center>
    </>
  );
}

export default Title;
