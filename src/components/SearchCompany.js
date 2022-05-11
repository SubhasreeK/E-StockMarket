import React,{useState} from 'react';

const SearchCompany = (props) =>{
    const[searchInput , setSearchInput] = useState('');
    const companies = [
        {
            "CompanyName":"abc company",
            "CompanyCode":"001",
            "StartDate":"2020/10/26",
            "EndDate":"2120/10/26",
            "StockPrice":"2000",
            "MinValue":"1000",
            "MaxValue":"5000",
            "AvgValue":"3000"
        },
        { 
            "CompanyName":"def Company",
            "CompanyCode":"002",
            "StartDate":"2010/10/26",
            "EndDate":"2110/10/26",
            "StockPrice":"3000",
            "MinValue":"3000",
            "MaxValue":"5000",
            "AvgValue":"9000"
        },
        {
            "CompanyName":"ghk Company",
            "CompanyCode":"003",
            "StartDate":"2000/10/26",
            "EndDate":"2100/10/26",
            "StockPrice":"4000",
            "MinValue":"5000",
            "MaxValue":"10000",
            "AvgValue":"7500"
        },
        {
            "CompanyName":"abk Company",
            "CompanyCode":"004",
            "StartDate":"2000/10/26",
            "EndDate":"2100/10/26",
            "StockPrice":"4000",
            "MinValue":"5000",
            "MaxValue":"10000",
            "AvgValue":"7500"
        }
    ];
    const handleChange = (e) =>{
        e.preventDefault();
        setSearchInput(e.target.value);
    };
    const inputResult = () =>{
        console.log("capture on input--"+searchInput);
        if(searchInput.length > 0 ){
            const filtered = companies.filter(
                (company)=> company.CompanyName.match(searchInput)
            );
            console.log(filtered);
            props.parentCallback(filtered);
            return filtered;
            
        };
        
    }
   
        return(
            <div>
                <input className='search' type="search" placeholder='Search company' onChange={handleChange} value={searchInput}></input>
                <button onClick={inputResult} >Search</button>
            </div>
        );
    };
export default SearchCompany;