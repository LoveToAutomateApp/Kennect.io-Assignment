//const { defineConfig } = require("cypress");
import Login_Page_Object from "../support/pageobject/Login_Page_Object";
import Dashboard_Page_Object from "../support/pageobject/Dashboard_Page_Object";
const user_cred = require('../fixtures/credentials.json');
const user = require("../fixtures/user.json");

describe('kennect.io Assignment',()=>{
    const lpo = new Login_Page_Object();
    const dashboard_board = new Dashboard_Page_Object();

    before(()=>{
        cy.visit(user.redirection_url.url);
    })

    it('verify user is signed-in successfully',()=>{
        // find username field and type user email - please ent
        lpo.getUserField().type("test@kennect.io");
        //find password field and type user password
        lpo.getPasswordField().type("Qwerty@1234");        
        //click event on login submit to login as user
        lpo.getLoginSubmit().click();

        // //Add Test
        // cy.wait(3000);
        // dashboard_board.getSideNav("Tests");
        // dashboard_board.addTest("abc","SERUM","1ml","None",100);
        // cy.wait(2000)
        // // //Add Labs
        // dashboard_board.getSideNav("Labs");
        // dashboard_board.addLab("test5","test5@gmail.com",9292929292,"https://www.google.com","test12","cityTest",40000,"Maharashtra","abc");
        // cy.wait(2000)
        // // //Add Doctors
        // dashboard_board.getSideNav("Doctors");
        // dashboard_board.addDoctor("Deepak","deepak123@gmail.com","9494949494","MBBS","Doctor","Shree Clinic","14,Test123",400201,"Mumbai");
        // cy.wait(2000)
        // // //Add Inventory
        //  dashboard_board.getSideNav("Inventory");
        //  dashboard_board.addInventory("loreum Ipsum 2024","test123456",1000);
        //  cy.wait(2000)
        // // //Add Patient
        //  dashboard_board.getSideNav("Patients");
        //  dashboard_board.addPatient("sushil","sushil123@gmail.com",9292929292,152.4, 68,"Male",29,70,50,"abc","10%","test5","Deepak","10%","loreum Ipsum 2024");
        //  cy.wait(2000)
        // // Validate Cost of Test
        //    dashboard_board.getSideNav("Dashboard");
        //    cy.wait(4000);
        //    dashboard_board.costCalculator("abc","10%");
        // check correct user is signed in successfully
        cy.wait(4000);
        cy.get('div.MuiAvatar-circle').click();
        cy.get("div.MuiPopover-paper > div > div:nth-Child(3)").then(($element)=>{
        let userEmail = $element.text().toString().trim();
            expect(userEmail).to.eq(user_cred.credentials.user_email);
        })
        // check user is signed out successfully
         cy.get("div.MuiPopover-paper > div > div:nth-Child(5) > button").then(($buttonElement)=>{
            if($buttonElement.text().toString().trim().includes("Sign out of Lab")){
                cy.get("div.MuiPopover-paper > div > div:nth-Child(5) > button").click();
            }
         })
    })
})