import React from "react";
import BasicExample from "./DashTable";

function DashTableCont({id}) {
  return (
    <>
      <br /><br />   
     
      <div
        style={{
          backgroundColor: "honeydew",
          padding: "15px 8px",
          borderRadius: "5px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          width: "58%",
          marginBottom:"2%",
          marginLeft: "25%"
        }}
      >
        <BasicExample 
        id={id}
        ></BasicExample>
      </div>
    </>
  );
}

export default DashTableCont;