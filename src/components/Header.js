import React from 'react';
import {Route, Switch ,useHistory} from "react-router-dom";
import logo from '../image/StockLogo.jpg';
const Headers =()=> {
    let history = useHistory();
   function handleOnsubmit(e){
    e.preventDefault();
    history.push('/home')
    }
    return(
        <div className='App-header' >
                 <img className='logoimg' src= {logo} alt="E-Stock" onClick={handleOnsubmit}></img>
                 <h1 className="txt">E-Stock Market</h1>
             <Switch>
                    <Route exact path="/home"/>
             </Switch>
        </div>
)
}
export default Headers;