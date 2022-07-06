import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import {TextField,FormControl,InputLabel,Input} from '@material-ui/core';
import CompanyService from '../../services/ServiceCall';
import ErrorOutput from './FormValidation';
const AddCompany = () =>{
    let navigate = useHistory();
    const {handleSubmit} = useForm();

    const initialCompanyState = {
        id: null,
        companyCode : null,
        companyName : "",
        price : null,
        website: null,
        turnover:null,
        minPrice : null,
        maxPrice : null,
        avg : null,
        stockExchangeListed : null
    }
  
    const[newcomp, setNewcomp] = useState(initialCompanyState);
    const[submitted, setSubmitted] = useState(false);
    const handleInputChange = event =>{
        const {name,value}= event.target ;
        setNewcomp({...newcomp,[name]:value});
    };
    const saveCompany =()=>{
        var data ={
            companyCode : newcomp.companyCode,
            companyCEO :  newcomp.companyCEO,
            companyName : newcomp.companyName,
            price : newcomp.price,
            website :   newcomp.website,
            turnover :  newcomp.turnover,
            minPrice : newcomp.minPrice,
            maxPrice : newcomp.maxPrice,
            avg : newcomp.avg,
            stockExchangeListed : 'true'
        };
     
        console.log(JSON.stringify(data, null, 2));
    CompanyService.create(data)
    .then(response =>{
        if(response.status === 200){
            console.log("SUCCESSS")
            setSubmitted(true);
        }else if(response.status === 408){
            console.log("SOMETHING WENT WRONG")
            setSubmitted(false)
        }
        console.log(response.data);
    })
    .catch(e => {
        console.log(e);
    });
    };
    const newCompany =()=>{
        setNewcomp(initialCompanyState);
        setSubmitted(false);
    }
    const cancelCompany = () =>{
        navigate.push("/home");
   };
    return(
        <div className='submit-form '>
            {submitted ? (
                <div>
                    <h4>You Submitted Successfully!</h4>
                    <button className='btn btn-success' onClick={newCompany}>Add Company</button>
                </div>
            ):(
                <form  onSubmit={handleSubmit(saveCompany)}>
                <div className="container Logins">
                <h3>Add Company</h3>
               
                    <FormControl  variant='outlined' >
                        <InputLabel htmlFor='companyName'>Company Name</InputLabel>
                            <Input required id="companyName" className='form-control' onChange={handleInputChange} name="companyName"
                            value={newcomp.companyName} />
                        <ErrorOutput case={newcomp.companyName} name={'companyName'}/>
                    </FormControl> <br />

                    <FormControl  variant='outlined' >
                        <InputLabel htmlFor='companyCEO'>Company CEO</InputLabel>
                            <Input required id="companyCEO" className='form-control' onChange={handleInputChange} name="companyCEO"
                            value={newcomp.companyCEO} />
                        <ErrorOutput case={newcomp.companyCEO} name={'companyCEO'}/>
                    </FormControl> <br />
                   
                    <FormControl variant='outlined'>
                        <InputLabel htmlFor='companyCode'>Company Code</InputLabel>
                        <Input required id="companyCode" className='form-control' onChange={handleInputChange}
                        name="companyCode" value={newcomp.companyCode}/>
                    </FormControl> <br />
                    <FormControl  variant='outlined'>
                        <InputLabel htmlFor='website'>Website</InputLabel>
                        <Input required id="website" className='form-control' onChange={handleInputChange} 
                        name="website" value={newcomp.website} inputProps={{ maxLength :50}}/>
                        <ErrorOutput case={newcomp.website} name={'website'}/>
                    </FormControl> <br />
                    <FormControl  variant='outlined'>
                        <InputLabel htmlFor='turnover'>Stock Price</InputLabel>
                        <Input required id="turnover" className='form-control' onChange={handleInputChange} pattern="[0-9]*"
                        name="turnover" value={newcomp.turnover} inputProps={{ maxLength :10}}/>
                        <ErrorOutput case={newcomp.turnover} name={'turnover'}/>
                    </FormControl> <br />
                    <FormControl  variant='outlined'>
                        <InputLabel htmlFor='price'>Turnover</InputLabel>
                        <Input required id="price" className='form-control' onChange={handleInputChange} pattern="[0-9]*"
                        name="price" value={newcomp.price} inputProps={{ maxLength :10}}/>
                        <ErrorOutput case={newcomp.price} name={'price'}/>
                    </FormControl> <br />
                   
                
                <button type='submit' className="btn btn-success formbutton">Submit</button>
                <button onClick={cancelCompany} className="btn btn-success formlable">Cancel</button>
            </div>
            </form>
            )
            }
        </div>
    );
};

export default AddCompany;