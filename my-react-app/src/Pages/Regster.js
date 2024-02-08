import React from "react";
import imageSrc from './1.png'; // Import the image file
import './Css/login.css'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
const Register = ()=>{


    const [showLogin, setShowLogin] = useState(false);


   const HandelChange=()=>{
        setShowLogin(!showLogin);
    }
   const HandelChangelog=()=>{
       setShowLogin(false)
    }

    return(

<div className="container-fluid">
    <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-12 col-lg-11 col-xl-10">
            <div className="card d-flex mx-auto my-5">
                <div className="row">
                    <div className="col-md-5 col-sm-12 col-xs-12 c1 p-5">
                        <div className="row mb-5 m-3"> <img src="https://i.imgur.com/pFfTOwy.jpg" width="70vw" height="55vh" alt=""/> </div> <img src={imageSrc} width="120vw" height="210vh" className="mx-auto d-flex" alt="Teacher"/>
                        <div className="row justify-content-center">
                            <div className="w-75 mx-md-5 mx-1 mx-sm-2 mb-5 mt-4 px-sm-5 px-md-2 px-xl-1 px-2">
                                <h1 className="wlcm">Welcome to your blackboard</h1> <span className="sp1"> <span className="px-3 bg-danger rounded-pill"></span> <span className="ml-2 px-1 rounded-circle"></span> <span className="ml-2 px-1 rounded-circle"></span> </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7 col-sm-12 col-xs-12 c2 px-5 pt-5">
                        <div className="row">
                            <nav className="nav font-weight-500 mb-1 mb-sm-2 mb-lg-5 px-sm-2 px-lg-5">
                            <a className="nav-link" href="#">Doctor</a> 
                            <a className="nav-link" href="#">patient</a>                             </nav>
                        </div>
                        {!showLogin ? (
                             <form name="myform" onsubmit="" className="px-5 pb-5">
                            <div className="d-flex">
                                {/* <img src="https://i.imgur.com/oGcceAH.jpg" height="22px" width="22px" alt="" className="mr-3 mt-2"/>
                                <h3 className="font-weight-bold">Log in</h3> */}
                            </div>
                             <input type="text" name="userid" placeholder="Your Name"/>
                             <input type="email" name="userid" placeholder="Your Email"/>
                             <input type="password" name="passw" placeholder="Password"/> 
                             <input type="password" name="passw" placeholder="Confirm Password"/> 
                             {/* <span className="ac" id="forgot">Forgot?</span> */}
                             <button className="text-white text-weight-bold bt">Register</button>
                             <h5 className="ac" onClick={HandelChange} id="register">I Have Account</h5>
                        </form>

                        ):(
                            <form onsubmit="event.preventDefault()" name="myform"  class="px-5 pb-5">
                            <div class="d-flex">
                                {/* <img src="https://i.imgur.com/oGcceAH.jpg" height="22px" width="22px" alt="" class="mr-3 mt-2"/>
                                <h3 class="font-weight-bold">Log in</h3> */}
                            </div> <input type="text" name="userid" placeholder="User"/>
                            <input type="password" name="passw" placeholder="Password" />
                             <span class="ac" id="forgot">Forgot?</span>
                              <button class="text-white text-weight-bold bt">Log in</button>
                            <h5 class="ac" id="register" onClick={HandelChangelog}>Create Acount </h5>
                           </form>

                        )
                        }
                       


                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
          )
}
export default Register;
//        <div classNameName="container mt-5">
//  <div classNameName="border row">
//  <div classNameName="col-6 bg-info">
//                    <img src={imageSrc} alt='....' style={{width:'400px'}} />
//                 </div>
//                 <div classNameName="col-6">
//                     <form>
//                         <label>Name </label>
//                         <input classNameName="form-control" type="text" /><br/>
//                         <label>Email </label>
//                         <input classNameName="form-control" type="email" /><br/>
//                         <label>Password </label>
//                         <input classNameName="form-control" type="Password" /><br/>
//                         <label>Confirm Password </label>
//                         <input classNameName="form-control" type="passwrd" />
//                         <button type="submit" classNameName="btn btn-primary mt-3" >Submit</button>
//                     </form>
//                 </div>
          

//        </div>
//        </div>