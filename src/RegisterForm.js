import React from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import UserStore from "./stores/UserStore";
import axios from 'axios';


class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email:"",
      buttonDisabled: false,
    };
  }



  setInputValue(property, val) {
    val = val.trim();
    if (val.length > 50) {
      return;
    }
    this.setState({
      [property]: val,
    });
  }

  resetForm() {
    this.setState({
      username: "",
      password: "",
      email:"",
      buttonDisabled: false,
    });
  }

  registerUser() {

    const axios = require('axios')

    axios.post(`https://bff-training.et.r.appspot.com/auth/local/register`, { 
      "username": this.state.username, 
      "email": this.state.email, 
      "password": this.state.password
     })
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
  }

  async doLogin() {
    
    if (!this.state.username) {
      return;
    }
    if (!this.state.password) {
      return;
    }
    if (!this.state.email) {
      return;
    }
    this.setState({
      buttonDisabled: true,
    });

    


    try {
      let res = await fetch("/login", {
        method: "post",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      });

      let result = await res.json();

      if (result && result.success) {
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      } else if (result && result.success === false) {
        this.resetForm();
        alert(result.msg);
      }
    } catch (e) {
      console.log(e);
      this.resetForm();
    }
    
  }

  render() {
    return (
      <div className="loginForm">
        Register
        <InputField
          type="text"
          placeholder="Username"
          value={this.state.username ? this.state.username : ""}
          onChange={(val) => this.setInputValue("username", val)}
        />
        <InputField
          type="text"
          placeholder="Email"
          value={this.state.email ? this.state.email : ""}
          onChange={(val) => this.setInputValue("email", val)}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={this.state.password ? this.state.password : ""}
          onChange={(val) => this.setInputValue("password", val)}
        />
        <SubmitButton
          className="btn"
          text="Register"
          disabled={this.state.buttonDisabled}
          onClick={() => this.registerUser()}
        />

        
      </div>
    );
  }
}

export default RegisterForm;
