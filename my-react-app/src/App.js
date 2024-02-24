import logo from './logo.svg';
import './App.css';
import Navbar from './Component/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Component/Footer';
import HomePage from './Pages/Home';
import About from './Pages/About';
import DoctorsPage from './Pages/Doctors'
import DoctorProfile from './Pages/ProfileDoctor'
import BeforeSignUpFor from './Pages/BeforeSignUp'
import LoginNut from './Pages/LoginNut';
import RegsNut from './Pages/RegNut';
import LoginPatien from './Pages/LoginPatient';
import Regspatien from './Pages/RegPatient';
import DoctorDetails from './Pages/Doctorshow';
import EditUserPage from './Pages/Form'

import PatientDetails from './Pages/Patientshow';
import MyContext from '../src/Context/Context';
import Dash from './Pages/Dash';
function App() {
  return (
    <div className="App">
        <BrowserRouter >
        <Navbar/>
        <Switch>
        <Route exact path={`/user/:id`}
          component={PatientDetails}/>
        <Route exact path='/form'
          component={EditUserPage}/>
          <Route exact path='/'
          component={HomePage}/>
          <Route exact path='/profile' 
          component={DoctorProfile}/>
          <Route exact path='/doctors'
          component={DoctorsPage}/>
           <Route exact path='/profile/:id'
          component={DoctorDetails}/>
           <Route exact path='/About-us'
          component={About}/>
          <Route exact path='/login'
          component={BeforeSignUpFor}/>
          <Route exact path='/logNut'
          component={LoginNut}/>
          <Route exact path='/LogPat'
          component={LoginPatien}/>
          <Route exact path='/RegNut'
          component={RegsNut}/>
          <Route exact path='/RegPat'
          component={Regspatien}/>
          
         
          
          
                   <Route exact path='/dashboard/:id'
          component={Dash}/>
        </Switch>
        <Footer/>
        </BrowserRouter>  
          
    </div>
  );
}

// import BeforeSignUpFor from './Pages/BeforeSignUp';


export default App;
