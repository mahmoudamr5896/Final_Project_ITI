import logo from './logo.svg';
import './App.css';
import Navbar from './Component/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Component/Footer';
import Offer from './Component/Offers';
function App() {
  return (
    <div className="App">
        <BrowserRouter >
        <Navbar/>
        <Switch>
        </Switch>
        <Offer></Offer>
        <Footer/>
        </BrowserRouter>
    </div>
  );
}

export default App;
