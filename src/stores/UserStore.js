import { extendObservable } from "mobx";

/*
UserStore
*/

class UserStore {
  constructor() {
    extendObservable(this, {
      loading: true,
      isLoggedIn: false,
      username: "",
      isRegisterPage: true,
      isLoginPage: false
      
    });
  }
}

export default new UserStore();
