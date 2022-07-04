import React , {useState,useEffect,useRef,useMemo} from 'react';
import {useTable} from 'react-table';
import {useHistory} from 'react-router-dom';
import CompanyService from '../../services/ServiceCall';
import {Row,Col} from 'react-bootstrap';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from 'axios';
 const ListCompany =(props)=>{
     let history = useHistory();
     //const url = 'http://65.2.90.227:8000/api/v1.0/market/company/info/001';
    //const url1 = 'http://65.2.90.227:8000/api/v1.0/market/company/info/getall';
    //const url = 'http://localhost:8081/search';
    // const url1 = 'http://localhost:8082/list';
    const [companies,setCompanies] = useState([]);
    const [currentCompany,setCurrentCompany] = useState(null);
    const [currentIndex,setCurrentIndex] = useState(-1);
    const [searchCompany,setSearchCompany] = useState("");
    const companyRef =useRef();
    companyRef.current = companies;
    useEffect(()=>{
        retrieveCompany();
    },[]);
    const onChangesSearchCompany = e =>{
        const searchname = e.target.value;
        setSearchCompany(searchname);
    }
    const retrieveCompany = () =>{
       // axios.get(url1)
       CompanyService.getAll()
        .then(response => {
            setCompanies(response.data);
            console.log(JSON.stringify(response.data, null, 2));
        })
        .catch(e =>{
            console.log(e);
        });
    };
    const refreshList =()=>{
        retrieveCompany();
        setCurrentCompany(null);
        setCurrentIndex(-1);
    };
    const setActiveCompany = (company,index) =>{
        setCurrentCompany(company);
        setCurrentIndex(index);
    }
    const findbyname = () =>{
        //axios.get(url)
        const name = searchCompany; 
        console.log("Inside Find NAme = ",name); 
        CompanyService.get(name)
        .then(response =>{
            console.log(response.data);
            let resArr = [response.data];
            console.log(JSON.stringify(resArr, null, 2));
            setCompanies(resArr);
        })
        .catch(e => {
            console.log(e);
        });
    };
    const openCompany = (rowIndex) => {
        const id = companyRef.current[rowIndex].companyCode;
        //props.history.push("/viewcompany");
        //Yet To Work on it
        console.log("View Company = "+ id)
        history.push({
            pathname: '/home/viewcompany',
            state: { detail: id}
        });
      };
    const deleteConfirm =(rowIndex)=>{
        const id = companyRef.current[rowIndex].companyCode;
        const name = companyRef.current[rowIndex].companyName;
        console.log(id);
        confirmAlert({
            title:'Are you sure',
            message:`Do you want to delete the ${name}?`,
            buttons:[
                {
                    label:'Yes',
                    onClick:()=> deleteCompany(id)
                },
                {
                    label:'No'                }
                
            ]
        })
    }
    const deleteCompany = (id) => {

        //const id = companyRef.current[rowIndex].companycode;
        console.log("Inside Delete - "+ id);
        CompanyService.remove(id)
          .then((response) => {
            //props.history.push("/home");
            //history.push("/home");
            let newCompany = [...companyRef.current];
           // newCompany.splice(rowIndex, 1);
            setCompanies(newCompany);
            refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
      };
      const columns = useMemo(
          ()=> [
        {
          Header : "Company Name",
          accessor : "companyName"
        },
        {
            Header : "Company Code",
            accessor : "companyCode"
        },
        {
            Header : "Company CEO",
            accessor : "companyCEO"
        },
        {
            Header : "Turn Over",
            accessor : "turnover"
        },
        {
            Header: "Actions",
            accessor: "actions",
            Cell : (props) =>{
                const rowIdx = props.row.id;
                return(
                    <div>
                        <span style={{marginRight:'10px'}} onClick={()=>openCompany(rowIdx)}>
                            <i className='far fa-edit action mr-2'></i>
                        </span>
                        <span onClick={()=> deleteConfirm(rowIdx)}>
                            <i className='fas fa-trash action'></i>
                        </span>
                    </div>
                );
            }
        }
    ],
    []
    );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({
        columns,
        data: companies,
      });
 return(
     <div className='list row container'>
         <div className='col-md-8'>
             <div className='input-group mb-3 formlable'>
                 <input type='text' className='form-control'
                 placeholder='Search by CompanyCode' value={searchCompany}
                 onChange={onChangesSearchCompany}/>

                 <div className='input-group-append'>
                     <button className='btn btn-outline-primary' type='button' onClick={findbyname}>Search</button>
                 </div>
             </div>
         </div>

         <div className='col-md-12 list'>
            <table className='table table-striped table-bordered tableStyle'
            {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup)=>(
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column)=>(
                                <th {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row,i)=>{
                        prepareRow(row);
                        return(
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell)=>{
                                    return(
                                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                    );
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
         </div>
       
     </div>
   
 )
}
export default ListCompany;