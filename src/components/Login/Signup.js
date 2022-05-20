import React from 'react';
import {TextField} from '@material-ui/core';
import Button from "react-bootstrap/Button";
import PasswordStr from './PasswordStr';
const SignUp = ({
    history,
    onSubmit,
    onChange,
    errors,
    user,
    score,
    btnTxt,
    type,
    pwMask,
    onPwChange
}) =>{
    return(
        <div className='SignupBox'>
            <h2>Sign Up</h2>
            {errors.message && <p style={{color:'red'}}>{errors.message}</p>}
            <form onSubmit={onSubmit}>
            <TextField className='forminput' name = 'username' placeholder= 'User name' value={user.username}
            onChange={onChange} helperText={errors.username} error={errors.username}/><br/>
            <TextField className='forminput' name = 'email' placeholder= 'Email' value={user.email}
            onChange={onChange} helperText={errors.email} error={errors.email}/><br/>
            <TextField className='forminput' type={type} name = 'password' placeholder= 'Password' value={user.password}
            onChange={onPwChange} helperText={errors.password} error={errors.password}/><br/>
            <div className='pwStrRow'>
                {score >=1 && (
                    <div>
                       
                        <Button className='pwShowHiddenBtn' onClick={pwMask}
                        style={{position:'relative',left:'50%',transform:'translateX(-50%)'}}
                        >{btnTxt}</Button>
                         <PasswordStr score={score}/>
                    </div>
                )}
            </div>
            <TextField className='forminput' type={type} name='pwconfrim' placeholder="Confrim Password" value={user.pwconfrim}
            onChange={onChange} helperText={errors.pwconfrim} error={errors.pwconfrim}/>
            <br/>
            <Button className="button" type='submit' primary={true}>Submit</Button>
            </form>
        <p> Already have an account? <br/>
        <a href='/'>Log in here</a>
        </p>
        </div>
   );
};
export default SignUp;
