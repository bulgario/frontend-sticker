import {
    ROUTES,
  } from '../consts'
  

  class User {
  
    static isAuthenticated(){
      if (!localStorage.getItem("user")) {
        return false;
      }
      return true;
    }
  
    static logout() {
      localStorage.removeItem("user");
    }
  
    constructor() {
      this.user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).usuario
        : null;
      this.token = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).token
        : null;


    }
    matchRoute(urlTested, matcher) {
        const urlSplitted = urlTested.split('/');
        const matchSplitted = matcher.split('/');
        return urlSplitted[1] === matchSplitted[1];
      };
  
    getToken() {
      return this.token;
    }
  
    getUser() {
      return this.user;
    }

    getIdMarcaEstilo() {
      const user = this.getUser()
      return user.id_marca_estilo
    }
    getLogin() {
      const user = this.getUser()
      return user.login
    }
    getEmail() {
      const user = this.getUser()
      return user.email
    }
  
    getAreas() {
      const user = this.getUser();
      return user.areas;
    }
  
    getUserInitialRoute() {
      if (true) {
        return ROUTES.HOME;
      }
  
    }
  
    isAdmin() {
      const user = this.getUser();
      return user.admin == 1; //eslint-disable-line
    }


  
    canAcessThisRoute(route) {
      // if(this.isAdmin() || this.matchRoute(route,ROUTES.SEARCH)) {
      //   return true;
      // }
      if(this.matchRoute(route,ROUTES.SEARCH)) {
        return true;
      }
      if (this.matchRoute(route, ROUTES.LOGIN)) {
        return true;
      }
      if (this.matchRoute(route, ROUTES.INSTA)) {
        return true;
      }

      if (this.matchRoute(route, ROUTES.HOME)) {
        return true;
      }

      if (this.matchRoute(route, ROUTES.SELECTEDPRODUCT)) {
        return true;
      }

      if (this.matchRoute(route, ROUTES.MYPRODUCTS)) {
        return true;
      }

      if (this.matchRoute(route, ROUTES.RELATORIO)) {
        return true;
      }

      if (this.matchRoute(route, ROUTES.PRODUTOS)) {
        return true;
      }
  
      return false;
    };
  
  }
  
  export default User;
  