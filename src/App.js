import React,{Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import Headers from './components/Header';
import Login from './components/Login/Login';
import Home from './components/Home';
import AutoLogoutTimer from './AutoLogout';

class App extends Component{

 
 render(){
  return (
    <div className="App">
     <Headers/>
      <Switch>
        <Route exact path='/'><Login/></Route>
        <Route path='/home'><AutoLogoutTimer ComposedClass={Home} /></Route>
      </Switch>
      
    </div>
  );
}
}


export default App;
