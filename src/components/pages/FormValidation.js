import React from 'react';
const  ErrorOutput = props => {
    let name = props.name
    let inputValue = props.case
    if (name === 'companyName') {
      if (!inputValue.match(/^[a-zA-Z\s]*$/) && inputValue.length > 0) {
          return <span className='formvalidationmsg'>Letters only</span>
        }
      return <span></span>
    }
    if (name === 'price' || name === 'minPrice' || name === 'maxPrice' || name === 'avg') {
    if(inputValue != null){
      if(!inputValue.match(/^[0-9]+$/) && inputValue.length > 0) {
          return <span className='formvalidationmsg'>Enter Numeric Value</span>
        }
      return <span></span>
    }}
  }
  export default ErrorOutput;