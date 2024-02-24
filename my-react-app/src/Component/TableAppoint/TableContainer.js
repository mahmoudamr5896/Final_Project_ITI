import React from "react";
import BasicExample from "./DashTable";
import DoctorAppointmentsTable from "./DashTable";

function DashTableCont() {
  return (
    <>
      <br /><br />    <br /><br />    
      <h3 style={{ marginLeft: "-40%",fontFamily:"font-family: 'Inter', sans-serif;" }}>Current Appointments</h3><br /><br /> 
      <div
        style={{
          backgroundColor: "white",
          padding: "50px",
          borderRadius: "5px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          width: "55%",
          marginBottom:"2%",
          marginLeft: "22%"
        }}
      >
        <DoctorAppointmentsTable></DoctorAppointmentsTable>
      </div>
    </>
  );
}

export default DashTableCont;
