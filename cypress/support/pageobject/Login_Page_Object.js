
const user = require("../../fixtures/user.json");

export default class Login_Page_Object{

    // return user field element
    getUserField(){
        return cy.get(user.login_form_elements.user_email_field);
    }
    // return password field element
    getPasswordField(){
        return cy.get(user.login_form_elements.user_password_field);
    }
    //return login submit button element
    getLoginSubmit(){
        return cy.get(user.login_form_elements.user_login_submit);
    }
}