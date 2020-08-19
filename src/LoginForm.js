import React from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import UserStore from "./stores/UserStore";
import axios from 'axios';


class LoginForm extends React.Component {



  constructor(props) {
    super(props);
    this.state = {
      identifier: "",
      password: "",
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
        identifier: "",
        password: "",
      buttonDisabled: false,
    });
  }

  loginUser() {

    const axios = require('axios')

    axios.post(`https://bff-training.et.r.appspot.com/auth/local`, { 
      "identifier": this.state.identifier, 
      "password": this.state.password
     })
    .then(res => {
      console.log(res);
      console.log(res.data);

      if (res.status == 200) {
        UserStore.username = res.data.user.username
        UserStore.isLoggedIn = true

      } else {
        UserStore.username = ""
        UserStore.isLoggedIn = false
        
      }
      
      
      
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
          username: this.state.idenfitier,
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
        Log in
        <InputField
          type="text"
          placeholder="Username or Email"
          value={this.state.identifier ? this.state.identifier : ""}
          onChange={(val) => this.setInputValue("identifier", val)}
        />
        
        <InputField
          type="password"
          placeholder="Password"
          value={this.state.password ? this.state.password : ""}
          onChange={(val) => this.setInputValue("password", val)}
        />
        <SubmitButton
          className="btn"
          text="Log in"
          disabled={this.state.buttonDisabled}
          onClick={() => this.loginUser()}
        />

        
      </div>
    );
  }
}

export default LoginForm;
