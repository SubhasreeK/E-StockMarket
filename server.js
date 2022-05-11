const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use('/login', (req, res) => {
    res.send({
      token: 'test123'
    });
  });
  app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));

  app.use('/search', (req, res) => {
    res.send( [
        {
            "companyname":"ABC Company",
            "companycode":"001",
            "startdate":"2020/10/26",
            "enddate":"2120/10/26",
            "stockprice":"2000",
            "minvalue":"1000",
            "maxvalue":"5000",
            "avgvalue":"3000"
        }
    ]
   );
  });
  app.listen(8081, () => console.log('API is running on http://localhost:8081/search'));

  app.use('/view', (req, res) => {
    res.send( 
        {
            "companyname":"ABC Company",
            "companycode":"001",
            "startdate":"2020/10/26",
            "enddate":"2120/10/26",
            "stockprice":"2000",
            "minvalue":"1000",
            "maxvalue":"5000",
            "avgvalue":"3000"
        }
    
   );
  });
  app.listen(8083, () => console.log('API is running on http://localhost:8083/view'));

app.use('/list', (req, res) => {
    res.send( [
        {
            "companyname":"ABC Company",
            "companycode":"001",
            "startdate":"2020/10/26",
            "enddate":"2120/10/26",
            "stockprice":"$ 2000",
            "minvalue":"1000",
            "maxvalue":"5000",
            "avgvalue":"3000"
        },
        { 
            "companyname":"DEF Company",
            "companycode":"002",
            "startdate":"2010/10/26",
            "enddate":"2110/10/26",
            "stockprice":"$ 3000",
            "minvalue":"3000",
            "maxvalue":"5000",
            "avgvalue":"9000"
        },
        {
            "companyname":"GHK Company",
            "companycode":"003",
            "startdate":"2000/10/26",
            "enddate":"2100/10/26",
            "stockprice":"$ 4000",
            "minvalue":"5000",
            "maxvalue":"10000",
            "avgvalue":"7500"
        }
    ]
   );
  });
  app.listen(8082, () => console.log('API is running on http://localhost:8082/list'));