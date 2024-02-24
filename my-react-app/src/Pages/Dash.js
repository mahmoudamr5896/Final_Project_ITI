import React from "react";
import "../Component/dash_cards/card.css";
import Sidebar from "../Component/SideBar/Sidebar";
import Cards from "../Component/dash_cards/card";
import Reviews from "../Component/Reviews/Review";
import DashTableCont from "../Component/TableAppoint/TableContainer";
import ProgressChart from "../Component/Charts/ProgrssChart";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";


function Dash() {
  const { id } = useParams();
  console.log("id:", id);
  return (
    <>
    <br></br>
    <div className="DashCont">
      <div className="ChartCont">
        <br></br> <br></br><br></br><br></br>
        <Sidebar 
        id={id}/>
        <h1 style={{ marginLeft: "-50%" }} className="DashTiTlle">Dashboard</h1>
        <Cards 
         id={id}
        />
        <DashTableCont
         id={id}
        ></DashTableCont>
        <ProgressChart
        id={id}
        ></ProgressChart>
        <div>
          <Reviews

          ></Reviews>
          
        </div>
       
     
      </div>
    </div>
    </>
  );
}

export default Dash;
