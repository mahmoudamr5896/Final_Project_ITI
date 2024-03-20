import React from "react";
import "../Component/dash_cards/card.css";
import Sidebar from "../Component/SideBar/Sidebar";
import Cards from "../Component/dash_cards/card";
import Reviews from "../Component/Reviews/Review";
import DashTableCont from "../Component/TableAppoint/TableContainer";
import ProgressChart from "../Component/Charts/ProgrssChart";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";


function Dash() {
  const { id } = useParams();
  console.log("id:", id);
///_____________________________________________________________________________
  const history = useHistory()
  const storedId = sessionStorage.getItem('userData') ;
  const userData = localStorage.getItem('userData') ;
  const userDatas = JSON.parse(storedId); 
  const userData_ = JSON.parse(userData); 
  if(!userData_ && !storedId){
     history.push('/')
  }else{
    // if(userDatas.role === 'Patient'){
    //   console.log(userDatas.role)
    //    history.push('/')
    // }else{
    //   if(userDatas.id == id userData_ ){
    //     console.log(userDatas.role)
    //     console.log('ok')
    //    }else{
    //        history.push('/')
    //    } 
    // } 
  }
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
        {/* <ProgressChart
        id={id}
        ></ProgressChart> */}
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
