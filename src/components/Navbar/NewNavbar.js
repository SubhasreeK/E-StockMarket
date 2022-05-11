import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import AddCompany from '../pages/AddCompany';
import ListCompany from '../pages/ListCompany';
import ViewCompany from '../pages/ViewCompany';
import AutoSlider from '../AutoSlider';

function Navbars(){
    const logout = ()=> {
        localStorage.clear();
      }
    return(
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a href="/home" className="navbar-brand navstyle">
                   Home
                </a>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/home/listcompany"} className="nav-link">
                            List All Companies 
                        </Link>
                    </li>
                    <li className="nav-item">
                    <Link to={'/home/addcompany'} className="nav-link">
                            Add Company
                    </Link>
                    </li>
                    </ul>
                    <ul className="navbar-nav">
                    <li className="nav-item">
                    <Link to={'/'} className="nav-link" onClick={logout}>
                            Logout
                    </Link>
                    </li>
                    </ul>
                </div>
            </nav>
            
            <div>
                <Switch>
                    <Route path="/home/listcompany"><ListCompany/></Route>
                    <Route path="/home/addcompany"><AddCompany/></Route>
                    <Route path="/home/viewcompany"><ViewCompany/></Route>
                    <Route path="/home"><AutoSlider/></Route>
                </Switch>
            </div>
        </div>
    );
};
export default Navbars;