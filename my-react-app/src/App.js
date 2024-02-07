import logo from './logo.svg';
import './App.css';
import Navbar from './Component/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
        <BrowserRouter >
        <Navbar/>
        <Switch>
        </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
