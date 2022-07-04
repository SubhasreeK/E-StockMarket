import React,{useState,useEffect} from "react";
import {useParams, useHistory, useLocation} from 'react-router-dom';
import CompanyService from '../../services/ServiceCall';
import axios from 'axios';
const ViewCompany = props =>{
    //const url = 'http://43.205.53.10:8012/api/v1.0/market/stock/add';
    const {id} = useParams();
    const location = useLocation();
    let navigate = useHistory();
    const initialCompanyState = [{
        id:null,
        companyName:"",
        companyCode:"",
        price:null
    }
    ];
    
    const [currentCompany, setCurrentCompany] = useState(null);
    const [message,setMessage] = useState("");
    const getCompany = () =>{
        
         console.log("View - "+location.state.detail);
         const id = location.state.detail;
       CompanyService.get(id)
        .then(response => {
            setCurrentCompany(response.data);
            console.log({currentCompany});
        })
        .catch(e =>{
            console.log(e);
        });
    };
    useEffect(()=>{
            getCompany();
    },[]);
    const handleInputChange = event =>{
        const {name,value} = event.target;
        setCurrentCompany({...currentCompany,[name]:value});
    }
    const updateCompany= () =>{
        var data ={
            price : currentCompany.price,
        }
        console.log(data);
       axios.post(`http://43.205.53.10:8012/api/v1.0/market/stock/add/${currentCompany.companyCode}`,data)
        .then(response => {
            console.log(response.data);
            setMessage("Company has been Updated Sucsessfully!!")
        })
        .catch(e => {
            console.log(e);
            navigate.push("/home/listcompany"); 
        })
    }
    const cancelCompany = () =>{
         navigate.push("/home/listcompany");
    };
    return(
        <div>
            {currentCompany?(
                <div className="edit-form">
                    <h5>Edit Company Details</h5>
                    <form>
                       
                        <div className="form-group">
                            <label htmlFor="companyName">Company Name</label>
                            <input
                            type="text" disabled
                            className="form-control"
                            id="companyName" name="companyName" value={currentCompany.companyName} 
                            onChange={handleInputChange}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="companyCode">Company Code</label>
                            <input
                            type="text" disabled
                            className="form-control" 
                            id="companyCode" name="companyCode" value={currentCompany.companyCode} 
                            onChange={handleInputChange}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Stock Price</label>
                            <input
                            type="text"
                            className="form-control"
                            id="price" name="price" value={currentCompany.price} 
                            onChange={handleInputChange}></input>
                        </div>
                     
                    </form>
                    <button type="submit" className="btn btn-success formbutton" onClick={updateCompany}>Update</button>
                    <button className="btn btn-warning formlable" onClick={cancelCompany}>Back</button>
                <p>{message}</p>
                </div>
            ):(
                <div>
                    <br/>
                    <p>Please click here..</p>
                </div>
            )}
        </div>
    );
};
export default ViewCompany;