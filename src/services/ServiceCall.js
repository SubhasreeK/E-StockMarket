import http from '../http-common';

const getAll = () =>{
    return http.get("/api/v1.0/market/company/getall");
};
const get = companycode =>{
    return http.get(`/api/v1.0/market/company/info/${companycode}`);
}
const create = data =>{
  const res = data;
  console.log("what is Inside : "+ res);
    return http.post("/api/v1.0/market/company/register",data);
}
const remove = companycode =>{
    return http.delete(`/api/v1.0/market/company/delete/${companycode}`);
}
  const update = (companycode, data) => {
    console.log("what is Inside : "+{data});
    return http.put(`/api/v1.0/market/stock/add/${companycode}`, data);
  };
  const fetchByDate = (companycode, startdate , enddate) => {
    return http.get(`/api/v/1.0/market/stock/get/${companycode}/${startdate}/${enddate}`);
  };
const ServiceCall = {
    getAll,
    get,
    create,
    remove,
    update,
    fetchByDate
};
export default ServiceCall;