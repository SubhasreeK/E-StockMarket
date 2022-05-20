import React,{useState,useEffect} from "react";
import {useParams, useHistory} from 'react-router-dom';
import CompanyService from '../../services/ServiceCall';
import axios from 'axios';
const ViewCompany = props =>{
    const url = 'http://localhost:8083/view';
    //const {id} = useParams();
    let navigate = useHistory();
    const initialCompanyState = [{
        id:null,
        companyname:"",
        companycode:"",
        stockprice:null
    }
    ];
    
    const [currentCompany, setCurrentCompany] = useState(null);
    const [message,setMessage] = useState("");
    const getCompany = () =>{
        //CompanyService.get(id)
        axios.get(url)
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
        CompanyService.update(currentCompany.companycode,currentCompany)
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
                            <label htmlFor="companyname">Company Name</label>
                            <input
                            type="text"
                            className="form-control"
                            id="companyname" name="companyname" value={currentCompany.companyname} 
                            onChange={handleInputChange}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="companycode">Company Code</label>
                            <input
                            type="text"
                            className="form-control"
                            id="companycode" name="companycode" value={currentCompany.companycode} 
                            onChange={handleInputChange}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="stockprice">Stock Price</label>
                            <input
                            type="text"
                            className="form-control"
                            id="stockprice" name="stockprice" value={currentCompany.stockprice} 
                            onChange={handleInputChange}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="minvalue">Minimum Value</label>
                            <input
                            type="text"
                            className="form-control"
                            id="minvalue" name="minvalue" value={currentCompany.minvalue} 
                            onChange={handleInputChange}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="maxvalue">Maxmium Value</label>
                            <input
                            type="text"
                            className="form-control"
                            id="maxvalue" name="maxvalue" value={currentCompany.maxvalue} 
                            onChange={handleInputChange}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="avgvalue">Average Value</label>
                            <input
                            type="text"
                            className="form-control"
                            id="avgvalue" name="avgvalue" value={currentCompany.avgvalue} 
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