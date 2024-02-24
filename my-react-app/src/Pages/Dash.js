import React from "react";
import "../Component/dash_cards/card.css";
import Sidebar from "../Component/SideBar/Sidebar";
import Cards from "../Component/dash_cards/card";
import Reviews from "../Component/Reviews/Review";
import DashTableCont from "../Component/TableAppoint/TableContainer";
import ProgressChart from "../Component/Charts/ProgrssChart";



function Dash() {
  return (
    <>
    <br></br>
    <div className="DashCont">
      <div className="ChartCont">
        <br></br> <br></br><br></br><br></br>
        <Sidebar />
        <h1 style={{ marginLeft: "-50%" }} className="DashTiTlle">Dashboard</h1>
        
        <Cards />
        
        <DashTableCont></DashTableCont>
        <ProgressChart></ProgressChart>
        <div>
          <Reviews></Reviews>
          
        </div>
       
     
      </div>
    </div>
    </>
  );
}

export default Dash;
