import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import {TextField,FormControl,InputLabel,Input} from '@material-ui/core';
import CompanyService from '../../services/ServiceCall';
import ErrorOutput from './FormValidation';

const AddCompany =() =>{
    let navigate = useHistory();
    const {handleSubmit} = useForm();

    const initialCompanyState = {
        id: null,
        companycode : null,
        companyname : "",
        stockprice : null,
        minvalue : null,
        maxvalue : null,
        avgvalue : null
    }
    const[startdate, setStartdate] = useState(null);
    const[enddate, setEnddate] = useState(null);
    const[newcomp, setNewcomp] = useState(initialCompanyState);
    const[submitted, setSubmitted] = useState(false);
    const handleInputChange = event =>{
        console.log("Handle Inputs : "+event.target);
        const {name,value}= event.target ;
        setNewcomp({...newcomp,[name]:value});
    };
    const saveCompany =()=>{
        var data ={
            companycode : newcomp.companycode,
            companyname : newcomp.companyname,
            stockprice : newcomp.stockprice,
            startdate : startdate,
            enddate :  enddate,
            minvalue : newcomp.minvalue,
            maxvalue : newcomp.maxvalue,
            avgvalue : newcomp.avgvalue
        };
     
        console.log(JSON.stringify(data, null, 2));
    CompanyService.create(data)
    .then(response =>{
        setNewcomp({
            id : response.data.id,
            companycode : response.data.companycode,
            companyname : response.data.companyname,
            stockprice : response.data.stockprice,
            startdate : response.data.startdate,
            enddate : response.data.enddate,
            minvalue : response.data.minvalue,
            maxvalue : response.data.maxvalue,
            avgvalue : response.data.avgvalue
        });
        setSubmitted(true);
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
               
                    <FormControl fullWidth variant='filled'>
                        <InputLabel htmlFor='companyname'>Company Name</InputLabel>
                            <Input required id="companyname" className='form-control' onChange={handleInputChange} name="companyname"
                            value={newcomp.companyname} />
                        <ErrorOutput case={newcomp.companyname} name={'companyname'}/>
                    </FormControl>
                   
                    <FormControl fullWidth variant='filled'>
                        <InputLabel htmlFor='companycode'>Company Code</InputLabel>
                        <Input required id="companycode" className='form-control' onChange={handleInputChange}
                        name="companycode" value={newcomp.companycode}/>
                    </FormControl>
                    <FormControl fullWidth variant='filled'>
                        <InputLabel htmlFor='stockprice'>Stock Price</InputLabel>
                        <Input required id="stockprice" className='form-control' onChange={handleInputChange} pattern="[0-9]*"
                        name="stockprice" value={newcomp.stockprice} inputProps={{ maxLength :10}}/>
                        <ErrorOutput case={newcomp.stockprice} name={'stockprice'}/>
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <div className='formlable'>
                    <DesktopDatePicker  required
                        label="Start Date : "  value={startdate} minDate={new Date('2000-01-01')}
                        maxDate={new Date('2100-01-01')}
                        onChange={(newValue) => {setStartdate(newValue);}}
                        renderInput={(params) => <TextField fullWidth variant='outlined' {...params} />}
                    />
                    </div>
                    <div className='formlable'>
                    <DesktopDatePicker required className='formlable'
                        label="End Date : "  value={enddate} minDate={new Date()}
                        maxDate={new Date('2100-01-01')}
                        onChange={(newValue) => {setEnddate(newValue);}}
                        renderInput={(params) => <TextField fullWidth variant='outlined' {...params} />}
                    />
                    </div>
                    </LocalizationProvider>
                    <FormControl fullWidth variant='filled'>
                        <InputLabel htmlFor='minvalue'>Minimum Value</InputLabel>
                        <Input required id="minvalue" className='form-control' onChange={handleInputChange}
                        name="minvalue" value={newcomp.minvalue} inputProps={{ maxLength :10}}/>
                         <ErrorOutput case={newcomp.minvalue} name={'minvalue'}/>
                    </FormControl>
                    <FormControl fullWidth variant='filled'>
                        <InputLabel htmlFor='maxvalue'>Maximum Value</InputLabel>
                        <Input required id="maxvalue" className='form-control' onChange={handleInputChange}
                        name="maxvalue" value={newcomp.maxvalue} inputProps={{ maxLength :10}}/>
                         <ErrorOutput case={newcomp.maxvalue} name={'maxvalue'}/>
                    </FormControl>
                    <FormControl fullWidth variant='filled'>
                        <InputLabel htmlFor='avgvalue'>Average Value</InputLabel>
                        <Input required id="avgvalue" className='form-control' onChange={handleInputChange}
                        name="avgvalue" value={newcomp.avgvalue} inputProps={{ maxLength :10}}/>
                         <ErrorOutput case={newcomp.avgvalue} name={'avgvalue'}/>
                    </FormControl>

                
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