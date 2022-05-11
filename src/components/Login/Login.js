import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import backgroundimg from '../../image/background.jpg';

import { withRouter } from 'react-router-dom';


class Login extends Component {

  constructor(props){
    super(props);

    this.state = {
      email : null,
      password : null,
      login : false,
      store : null,
      formErrors : {email:'',password:''},
      emailValid: false,
      passwordValid : false,
      formValid:false,
      loginStatus : ''
    }
    localStorage.clear();
  }
  handleClick(){
    this.setState({login:!this.login})
  }
  
  componentDidMount(){
    this.storecollect()
  }
  storecollect(){
    let store=JSON.parse(localStorage.getItem('login'));
    if(store && store.login){
      this.setState({login:true,store:store})
    }
  }
  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]:value},() => {this.validationField(name,value)});
    
  }

  login(){
    let found =false;
      fetch('http://localhost:8080/login',{
        method : "POST",
        body : JSON.stringify(this.state)
      }).then((response)=>{
        response.json().then(
          (result)=>{console.warn("result",result);
          localStorage.setItem('login',JSON.stringify({
            login:true,
            token:result.token
          }))
          this.storecollect();
      })
      found =true;
      if(found){
        this.setState({
          loginStatus : 'Logged In Successfully'
        });
        this.props.history.push('/home');
      }
      else{
        this.setState({
          loginStatus : 'Login Failed! Invalid Username/Password'
        });
      }
      }).catch(errors=> {
        this.setState({
          loginStatus : 'Server Down'
        });
      })
  }
 
  validationField(fieldName,value){
    let fieldValidErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

     switch(fieldName){
       case 'email': 
           emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
           fieldValidErrors.email = emailValid ?'':'Enter correct email format';
           break;
      case  'password':
          passwordValid = value.length>= 6;
          fieldValidErrors.password = passwordValid ?'':'Enter atleast 6 character';
          break;
      default :
        break;
     }
    
     this.setState({formErrors : fieldValidErrors,
        emailValid : emailValid,
        passwordValid : passwordValid
     },this.validateForm);
    }
    validateForm(){
      this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }
 
  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
 }
  render(){
  return (
  <div className="login" style={{backgroundImage:` url(${backgroundimg})`,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
      {
       
        <Form className="formstyle">
        <Form.Group size="lg" controlId="email" className={`${this.errorClass(this.state.formErrors.email)}`}>
          <Form.Label className="formlable">Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            name="email"
            onChange={(e) => {this.handleUserInput(e)}}
          />
          <Form.Text className="validationmsg">{this.state.formErrors.email}</Form.Text>
        </Form.Group>
        <Form.Group size="lg" controlId="password" className={`${this.errorClass(this.state.formErrors.password)}`}>
          <Form.Label className="formlable">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={(e) => {this.handleUserInput(e)}}
          />
          <Form.Text className="validationmsg">{this.state.formErrors.password}</Form.Text>
        </Form.Group>
        <Button className ="button" onClick ={()=>{this.login()}} size="lg" disabled={!this.state.formValid}>
          Login
        </Button>
        <div>
        <p className="validationmsg">{this.state.loginStatus}</p>
        </div>
      </Form>
      
    
    
      
      }
     
    </div>
  );
  };
}
export default withRouter(Login);
