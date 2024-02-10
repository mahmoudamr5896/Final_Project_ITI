import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Pages/Home';
import Register from './Pages/Regster';
function App() {
  return (
    <div >
        <BrowserRouter  >
        <Switch>
          <Route exact path='/' component={HomePage} ></Route>
          <Route exact path='/register' component={Register}></Route>
        </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
