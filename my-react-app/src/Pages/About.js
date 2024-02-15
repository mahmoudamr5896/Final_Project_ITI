import { useEffect, useState } from "react";
import Bh1 from "../Component/Bh1";
import Myp from "../Component/Myp";
import Dh1 from "../Component/Dh1";
import Facts from "../Component/Facts";
import Myimg from "../Component/Myimg";

function About(){


 
    return(
        <div className="container  ">
            <div className="row my-5">
                <div className="col-lg-6 col-md-12 col-sm-12 d-flex align-items-center"> 
                    <div> 
                        <Bh1 name="We are MR.Health" />
                        <Myp name="MR.Health is a site that helps to establish new healthy habits in a comfortable and pleasant way" />
                    </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12"> 
                    <Myimg img="/food.jpg" /> 
                </div>
            </div>
            <div className="row mb-5">
                <div className="col-lg-6 col-md-12 col-sm-12">
                    <Myimg img="/nutritionist.jpg" /> 
                </div>
                <div className="col-lg-5 col-md-12 col-sm-12 ms-5 d-flex align-items-center">
                    <div>
                        <Bh1 name="About us" />
                        <Myp name="MR.Health is a site that explains how weight management works and helps to establish new healthy habits in a comfortable and pleasant way. Our team applies the experience of professional nutritionists and studies all users' feedback to improve the application features." />
                        <Myp name="We work worldwide in 150+ countries with about 30k user." />
                    </div>
                </div>    
            </div>
            <div className="row my-5">
                <div className="col-3"></div>
                <div className="col-6">
                    <Bh1 name="Our mission is to help people fall in love with a healthy lifestyle!" />
                </div>
                <div className="col-3"></div>
            </div>
            <div className="row my-5">
                <div className="col-4"></div>
                <div className="col-4">
                    <Dh1 name="MR.Health Facts" />
                </div>
                <div className="col-4"></div>
            </div>
            <div className="row ">
                <div className="col-3"></div>
                <Facts bgcolor="bg-danger-subtle" img="/users.png" head="30k" content="participating users" />
                <Facts bgcolor="bg-success" img="/plan.png" head="150k" content="meal plan" />
                <div className="col-3"></div>
            </div>
            <div className="row mb-5 ">
                <div className="col-3"></div>
                <Facts bgcolor="bg-warning" img="/weight.png" head="115t" content="lost by users" />
                <Facts bgcolor="bg-primary-subtle" img="/calory.png" head="230M" content="calories tracked" />
                <div className="col-3"></div>
            </div>
            <div className="row my-5">
                <div className="col-4"></div>
                 <div className="col-4">
                    <Dh1 name="Our Principles" />
                </div>
                <div className="col-4"></div>
            </div> 
            <div className="row bg-info-subtle rounded-top-4">
                <div className="col-2"></div>
                <div className="col-8 bg-white my-5 border border-primary rounded-4">
                    <Bh1 name="Nutrition" />
                    <Myp name="MR.Health site is not a diet. You get a personalized meal plan that breaks barriers. It includes a tasty meal per day menu with simple step-by-step recipes, essential ingredients needed, preparation time, and a shopping list." />
                </div>
                <div className="col-2"></div>
            </div> 
            <div className="row bg-info-subtle rounded-bottom-4 mb-5">
                <div className="col-2"></div>
                <div className="col-8 bg-white my-5 border border-primary rounded-4">
                    <Bh1 name="Motivation" />
                    <Myp name="MR.Health site inspires you with fun & result. Set your goals, share your achievements with friends, explore the entertaining feed and get your personal interactive reports. Our 24/7 customer support line is ready to keep you motivated!" />
                </div>
                <div className="col-2"></div>
            </div>
        </div>
            

        )
    }

export default About;