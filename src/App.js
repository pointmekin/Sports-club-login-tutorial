import React from "react";
import { observer } from "mobx-react";
import UserStore from "./stores/UserStore";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import SubmitButton from "./SubmitButton";
import sports from "./assets/sports.jpg";
import "./App.css";

class App extends React.Component {
  async componentDidMount() {
    try {
      let res = await fetch("/isLoggedIn", {
        method: "post",
        headers: {
          "Accept": "applicaiton/json",
          "Content-Type": "applicaiton/json",
        },
      });

      let result = await res.json();

      if (result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      } else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    } catch (e) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
      // console.log(e.toString());
    }
  }

  togglePage() {
    if (UserStore.isRegisterPage) {
      UserStore.isRegisterPage = false;
    } else {
      UserStore.isRegisterPage = true;
    }
    
  }

  async doLogout() {

    if (UserStore.isLoggedIn) {
      UserStore.isLoggedIn = false;
      UserStore.username = "";
    }

    /*
    try {
      let res = await fetch("/logout", {
        method: "post",
        headers: {
          "Accept": "applicaiton/json",
          "Content-Type": "applicaiton/json",
        },
      });

      let result = await res.json();

      if (result && result.success) {
        UserStore.isLoggedIn = false;
        UserStore.username = "";
      }
    } catch (e) {
      console.log(e);
    }
    */
  }

  render() {
    if (UserStore.loading) {
      return (
        <div className="app">
          <div className="container">Loading, pleasewait...</div>
        </div>
      );
    } else {
      if (UserStore.isLoggedIn) {
        return (
          <div className="app">
            <div className="container">
              Welcome, {UserStore.username}
              <SubmitButton
                text={"Logout"}
                disabled={false}
                onClick={() => this.doLogout()}
              />
            </div>
          </div>
        );
      }

      return (
        <div className="app">
          <div className="container">
            {UserStore.isLoggedIn ? UserStore.username : ""}
            <img className="sportsImage" src={sports} alt="sports" />
            
            {UserStore.isRegisterPage ? <RegisterForm /> : <LoginForm />}


            
            <button
              className="toggleButton"
              onClick={() => this.togglePage()}
            >
            
            {UserStore.isRegisterPage ? "Already have an account? Log in now." : "Register an account."}
            </button>
          </div>
        </div>
      );
    }
  }
}

export default observer(App);
