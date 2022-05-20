import React, {Component} from 'react';
import SignUp from './Signup';
import axios from 'axios';
import zxcvbn from "zxcvbn";
import FormValidators from "./Validate";
const validateSignUpForm = FormValidators.validateSignUpForm;


class SignUpContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            errors :{},
            user:{
                username:'',
                email:'',
                password:'',
                pwconfrim:''
            },
            btnTxt:'show',
            type:'password',
            score: 0
        };
        this.pwMask = this.pwMask.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitSignUp = this.submitSignUp.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.pwHandleChange = this.pwHandleChange.bind(this);
    }
    handleChange(event){
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;
        this.setState({
            user
        });
    }
    pwHandleChange(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;
    
        this.setState({
          user
        });
    
        if (event.target.value === "") {
          this.setState(state =>
            Object.assign({}, state, {
              score: "null"
            })
          );
        } else {
          var pw = zxcvbn(event.target.value);
          this.setState(state =>
            Object.assign({}, state, {
              score: pw.score + 1
            })
          );
        }
      }
      submitSignUp(user) {
        var params = { username: user.usr, password: user.pw, email: user.email };
        axios
          .post(`http://localhost:3000/api/v1.0/market/company/register/${params}`)
          .then(res => {
            if (res.data.success === true) {
              localStorage.token = res.data.token;
              localStorage.isAuthenticated = true;
              window.location.reload();
            } else {
              this.setState({
                errors: { message: res.data.message }
              });
            }
          })
          .catch(err => {
            console.log("Sign up data submit error: ", err);
          });
      }
      validateForm(event) {
        event.preventDefault();
        var payload = validateSignUpForm(this.state.user);
        console.log(payload);
        if (payload.success) {
          this.setState({
            errors: {}
          });
          var user = {
            usr: this.state.user.username,
            pw: this.state.user.password,
            email: this.state.user.email
          };
          this.submitSignup(user);
        } else {
          const errors = payload.errors;
          console.log('test'+errors);
          this.setState({
            errors
          });
        }
      }
    
      pwMask(event) {
        event.preventDefault();
        this.setState(state =>
          Object.assign({}, state, {
            type: this.state.type === "password" ? "input" : "password",
            btnTxt: this.state.btnTxt === "show" ? "hide" : "show"
          })
        );
      }
      render(){
          return(
              <div>
                  <SignUp 
                   onSubmit={this.validateForm}
                   onChange={this.handleChange}
                   onPwChange={this.pwHandleChange}
                   errors={this.state.errors}
                   user={this.state.user}
                   score={this.state.score}
                   btnTxt={this.state.btnTxt}
                   type={this.state.type}
                   pwMask={this.pwMask}
                 />
              </div>
          );
      }
    
}
export default SignUpContainer;