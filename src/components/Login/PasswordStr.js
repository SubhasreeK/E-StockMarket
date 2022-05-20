import React from 'react';
 const PasswordStr = props =>{
     var strColor;
     var strWidth;
     switch(props.score){
         case 1:
             strColor ='red';
             strWidth ='20%';
             break;
         case 2:
             strColor ='orange';
             strWidth ='50%';
             break;
         case 3:
             strColor ='yellow';
             strWidth ='75%';
             break;
         case 4:
             strColor ='green';
             strWidth ='100%';
             break;
        default:
            strColor ='green';
             strWidth ='100%';
             break;
     }
     var style = {backgroundColor : strColor,height:'5px',width: strWidth, transition: "all 300ms ease-in-out"}
     return(
        <div>
         <p className='pwStrWeek'>week</p>
         <p className='pwStrStrong'>strong</p>
         <div style={style}/>
         </div>
     )
    }
 export default PasswordStr;