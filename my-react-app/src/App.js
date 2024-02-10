import logo from './logo.svg';
import './App.css';
import Navbar from './Component/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Component/Footer';
import Offer from './Component/Offers';
import HomePage from './Pages/Home';
import Register from './Pages/Login';
function App() {
  return (
    <div className="App">
        <BrowserRouter >
        <Navbar/>
        <Switch>
          <Route exact path='/'
          component={HomePage}/>
          <Route exact path='/login'
          component={Register}/>
        </Switch>
        <Footer/>
        </BrowserRouter>
    </div>
  );
}


export default App;
