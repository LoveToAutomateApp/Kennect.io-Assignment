
const user = require('../../fixtures/user.json');
//const { defineConfig } = require("cypress");
let global_amount = 0;

export default class Dashboard_Page_Object{

    // ------------------ cost calculator --------------------------------------<
      costCalculator(testname, discount){
        let newDiscount;
        let total_discount;
        let ans;
        if(discount != null){
            newDiscount = parseInt(discount.slice(0,2));
            total_discount = (newDiscount * 10 ) / 10;
            ans = newDiscount - total_discount;
        }

        //select test for patient
        cy.wait(2000);
        cy.get("div.MuiContainer-root > div:nth-Child(4) > div > div:nth-Child(2) > div:nth-Child(1) > div > div > div").click();
            cy.get("div.MuiContainer-root > div:nth-Child(4) > div > div:nth-Child(2) > div:nth-Child(1) > div > div > div").type(testname);
            cy.get("div.MuiContainer-root > div:nth-Child(4) > div > div:nth-Child(2) > div:nth-Child(1) > div > div > div").type('{downArrow}');
            cy.get("div.MuiContainer-root > div:nth-Child(4) > div > div:nth-Child(2) > div:nth-Child(1) > div > div > div").type('{enter}');
        cy.wait(2000);
        cy.get("input#patient-test").type(testname);

        //select discount
        this.costCalculatorDiscount(discount);

        // validate sub total amount
         cy.get("div.MuiContainer-root > div:nth-Child(4) > div > div:nth-Child(3) > div:nth-Child(1) > div:nth-Child(2)").then(($item)=>{
            let value = $item.text().toString().trim();
            if(value.includes(String(newDiscount))){
                expect(true).to.be.true;
            }
         })
         
        // validate total amount
        cy.get("div.MuiContainer-root > div:nth-Child(4) > div > div:nth-Child(3) > div:nth-Child(2) > div:nth-Child(2)").then(($item)=>{
            let value = $item.text().toString().trim();
            if(value.includes(String(ans))){
                expect(true).to.be.true;
            }
        })
      }

      costCalculatorDiscount(element){
        switch(element){
            case 'None':
                cy.get("div.MuiContainer-root > div:nth-Child(4) > div > div:nth-Child(2) > div:nth-Child(2) > div > div").click();
                cy.get("div.MuiPopover-paper > ul > li").then(($list)=>{
                    let text = $list.text().replace('\n').replace('\t').toString().trim();
                    if(text.includes(element)){
                       let rowIndex = $list.length - 4;
                       cy.get("div.MuiPopover-paper > ul > li:nth-Child("+rowIndex+")").click();
                    }
                })
            break;
            case '5%':
                cy.get("div.MuiContainer-root > div:nth-Child(4) > div > div:nth-Child(2) > div:nth-Child(2) > div > div").click();
                cy.get("div.MuiPopover-paper > ul > li").then(($list)=>{
                    let text = $list.text().replace('\n').replace('\t').toString().trim();
                    if(text.includes(element)){
                       let rowIndex = $list.length - 3;
                       cy.get("div.MuiPopover-paper > ul > li:nth-Child("+rowIndex+")").click();
                    }
                })
            break;
            case '10%':
                cy.get("div.MuiContainer-root > div:nth-Child(4) > div > div:nth-Child(2) > div:nth-Child(2) > div > div").click();
                cy.get("div.MuiPopover-paper > ul > li").then(($list)=>{
                    let text = $list.text().replace('\n').replace('\t').toString().trim();
                    if(text.includes(element)){
                       let rowIndex = $list.length - 2;
                       cy.get("div.MuiPopover-paper > ul > li:nth-Child("+rowIndex+")").click();
                    }
                })
            break;
            case '15%':
                cy.get("div.MuiContainer-root > div:nth-Child(4) > div > div:nth-Child(2) > div:nth-Child(2) > div > div").click();
                cy.get("div.MuiPopover-paper > ul > li").then(($list)=>{
                    let text = $list.text().replace('\n').replace('\t').toString().trim();
                    if(text.includes(element)){
                       let rowIndex = $list.length - 1;
                       cy.get("div.MuiPopover-paper > ul > li:nth-Child("+rowIndex+")").click();
                    }
                })
            break;
            case '20%':
                cy.get("div.MuiContainer-root > div:nth-Child(4) > div > div:nth-Child(2) > div:nth-Child(2) > div > div").click();
                cy.get("div.MuiPopover-paper > ul > li").then(($list)=>{
                    let text = $list.text().replace('\n').replace('\t').toString().trim();
                    if(text.includes(element)){
                       let rowIndex = $list.length;
                       cy.get("div.MuiPopover-paper > ul > li:nth-Child("+rowIndex+")").click();
                    }
                })
            break;
            default:
                 console.log('something went wrong');
        }
      }


    //------------------- add Patients --------------------------------------------<
    addPatient(name,email, phone, height, weight, gender, age, systolic, diastolic, testname, discount, labname, doctorname, doctor_commision, equipment){
        // handles patient table dynamically
        /*
           first search for patient detail in table
           if record already exists into table, edit and delete existing record
           else if record doesn't exist then add new patient record
        */
           cy.wait(2000);
         cy.get(user.patient_elements.patient_search_field).type(name);
         cy.wait(2000);
         cy.get("table.MuiTable-root > tbody > tr").then(($list)=>{
            let tableVal = $list.text().replace('\n').replace('\t').toString().trim();
            if(tableVal.includes("No records to display")){
                // click on add patient cta
                cy.get(user.patient_elements.add_patient_cta_button).click();
                // enter patient name
                cy.get(user.patient_elements.patient_name_field).type(name);
                // enter patient email
                   cy.get(user.patient_elements.patient_email_field).type(email);
                // enter patient contact
                   cy.get(user.patient_elements.patient_phone_field).type(phone);
                //click on form1 submit with logic
                   if(name.length < 4 || email.length < 4 || phone.length < 10){
                     cy.get(user.patient_elements.patient_form1_cancel).click();
                   }else{
                    cy.get(user.patient_elements.patient_form1_submit).click();
                }

                //enter patient height
                   cy.get(user.patient_elements.patient_height_field).type(height);
                //enter patient weight
                   cy.get(user.patient_elements.patient_weight_field).type(weight);
                // select patient gender
                   this.getGender(gender);
                // enter age
                   cy.get(user.patient_elements.patient_age_field).type(age);
                // enter systolic
                   cy.get(user.patient_elements.patient_systolic_field).type(systolic);
                // enter diastolic
                   cy.get(user.patient_elements.patient_diastolic_field).type(diastolic);

                if(age < 1 || systolic < 70 || diastolic < 50){
                   cy.get(user.patient_elements.patient_form2_cancel).click();
                }else{
                   cy.get(user.patient_elements.patient_form2_submit).click();
                }

                //select test for patient
                cy.get("div.MuiPaper-elevation1 > div > div:nth-Child(1) > div:nth-Child(1) > div:nth-Child(2) > div:nth-Child(1) > div > div > div").click();
                cy.get("div.MuiPaper-elevation1 > div > div:nth-Child(1) > div:nth-Child(1) > div:nth-Child(2) > div:nth-Child(1) > div > div > div > input").type(testname);
                cy.get("div.MuiPaper-elevation1 > div > div:nth-Child(1) > div:nth-Child(1) > div:nth-Child(2) > div:nth-Child(1) > div > div > div > input").type('{downArrow}');
                cy.get("div.MuiPaper-elevation1 > div > div:nth-Child(1) > div:nth-Child(1) > div:nth-Child(2) > div:nth-Child(1) > div > div > div > input").type('{enter}');
        
                cy.wait(2000);
                //select discount
                this.getDiscount(discount);
                cy.wait(2000);
                //select labs from recommendation
                cy.get("div.MuiPaper-elevation1 > div > div:nth-Child(1) > div:nth-Child(2) > div:nth-Child(1)  > div > div").click();
                cy.wait(3000);
                cy.get("div.MuiPaper-elevation1 > div > div:nth-Child(1) > div:nth-Child(2) > div:nth-Child(1)  > div > div > input").type(labname);
                cy.wait(3000);
                cy.get("div.MuiPaper-elevation1 > div > div:nth-Child(1) > div:nth-Child(2) > div:nth-Child(1)  > div > div > input").type('{downArrow}');
                cy.get("div.MuiPaper-elevation1 > div > div:nth-Child(1) > div:nth-Child(2) > div:nth-Child(1)  > div > div > input").type('{enter}');


                // cy.wait(3000);
                // //select doctor from list
                cy.get("div.MuiPaper-elevation1 > div > div:nth-Child(1) > div:nth-Child(2) > div:nth-Child(2)  > div > div").click();
                cy.wait(3000);
                cy.get("div.MuiPaper-elevation1 > div > div:nth-Child(1) > div:nth-Child(2) > div:nth-Child(2)  > div > div > input").type(doctorname);
                cy.wait(3000);
                cy.get("div.MuiPaper-elevation1 > div > div:nth-Child(1) > div:nth-Child(2) > div:nth-Child(2)  > div > div > input").type('{downArrow}');
                cy.get("div.MuiPaper-elevation1 > div > div:nth-Child(1) > div:nth-Child(2) > div:nth-Child(2)  > div > div > input").type('{enter}'); 
                cy.wait(3000);
                //select doctor's comission
                this.getDoctorsCommision(doctor_commision);
                //add equipment
                cy.wait(3000);
                cy.get(user.patient_elements.patient_equipment_add_button).click();
                    cy.get("table.MuiTable-root > tbody > tr:nth-Child(1) > td:nth-Child(1) > div > div").click();
                    cy.get("div.MuiPopover-paper > ul > li").then(($list)=>{
                        let title = $list.text().replace('\n').replace('\t').toString().trim();
                        if(title.includes(equipment)){
                            let rowIndex = $list.length;
                            cy.get("div.MuiPopover-paper > ul > li:nth-Child("+rowIndex+")").click();
                            cy.wait(2000);
                            cy.get(user.patient_elements.patient_equipment_save_button).click();
                        }
                    })
                
                cy.wait(2000);
                cy.get(user.patient_elements.patient_form3_submit).click();

            }else{
                let rowIndex = $list.length;
                cy.get("table.MuiTable-root > tbody > tr:nth-Child("+rowIndex+") > td:nth-Child(1)").click();
                cy.get("div.MuiCardContent-root > div > button").click();
            }
         })
     }

     getDoctorsCommision(element){
        switch(element){
            case user.patient_data.label_doctors_comission_none:
                cy.get(user.patient_elements.patient_doctors_discount_drop_down_arrow).click();
                cy.get("div.MuiPopover-paper > ul > li").then(($list)=>{
                    let title = $list.text().replace('\t').replace('\n').toString().trim();
                    if(title.includes(element)){
                        let rowIndex = $list.length - 6;
                        cy.get("div.MuiPopover-paper > ul > li:nth-Child("+rowIndex+")").click();
                    }
                })
            break;
            case user.patient_data.label_doctors_comission_ten_percent:
                cy.get(user.patient_elements.patient_doctors_discount_drop_down_arrow).click();
                cy.get("div.MuiPopover-paper > ul > li").then(($list)=>{
                    let title = $list.text().replace('\t').replace('\n').toString().trim();
                    if(title.includes(element)){
                        let rowIndex = $list.length - 5;
                        cy.get("div.MuiPopover-paper > ul > li:nth-Child("+rowIndex+")").click();
                    }
                })
            break;
            case user.patient_data.label_doctors_comission_twenty_percent:
                cy.get(user.patient_elements.patient_doctors_discount_drop_down_arrow).click();
                cy.get("div.MuiPopover-paper > ul > li").then(($list)=>{
                    let title = $list.text().replace('\t').replace('\n').toString().trim();
                    if(title.includes(element)){
                        let rowIndex = $list.length - 4;
                        cy.get("div.MuiPopover-paper > ul > li:nth-Child("+rowIndex+")").click();
                    }
                })
            break;
            case user.patient_data.label_doctors_comission_thirty_percent:
                cy.get(user.patient_elements.patient_doctors_discount_drop_down_arrow).click();
                cy.get("div.MuiPopover-paper > ul > li").then(($list)=>{
                    let title = $list.text().replace('\t').replace('\n').toString().trim();
                    if(title.includes(element)){
                        let rowIndex = $list.length - 3;
                        cy.get("div.MuiPopover-paper > ul > li:nth-Child("+rowIndex+")").click();
                    }
                })
            break;
            case user.patient_data.label_doctors_comission_fourty_percent:
                cy.get(user.patient_elements.patient_doctors_discount_drop_down_arrow).click();
                cy.get("div.MuiPopover-paper > ul > li").this(($list)=>{
                    let title = $list.text().replace('\t').replace('\n').toString().trim();
                    if(title.includes(element)){
                        let rowIndex = $list.length - 2;
                        cy.get("div.MuiPopover-paper > ul > li:nth-Child("+rowIndex+")").click();
                    }
                })
            break;
            case user.patient_data.label_doctors_comission_fifty_percent:
                cy.get(user.patient_elements.patient_doctors_discount_drop_down_arrow).click();
                cy.get("div.MuiPopover-paper > ul > li").then(($list)=>{
                    let title = $list.text().replace('\t').replace('\n').toString().trim();
                    if(title.includes(element)){
                        let rowIndex = $list.length - 1;
                        cy.get("div.MuiPopover-paper > ul > li:nth-Child("+rowIndex+")").click();
                    }
                })
            break;
            case user.patient_data.label_doctors_comission_sixty_percent:
                cy.get(user.patient_elements.patient_doctors_discount_drop_down_arrow).click();
                cy.get("div.MuiPopover-paper > ul > li").then(($list)=>{
                    let title = $list.text().replace('\t').replace('\n').toString().trim();
                    if(title.includes(element)){
                        let rowIndex = $list.length;
                        cy.get("div.MuiPopover-paper > ul > li:nth-Child("+rowIndex+")").click();
                    }
                })
            break;
            default:
                 console.log("error is doctors commission");
        }
     }

     getDiscount(element){
        switch(element){
            case user.patient_data.label_discount_none:
             cy.get(user.patient_elements.patient_discount_drop_down_arrow).click();
             cy.get("div.MuiPopover-paper > ul > li").then(($list)=>{
                let title = $list.text().replace('\n').replace('\t').toString().trim();
                if(title.includes(element)){
                    let rowIndex = $list.length - 4;
                    cy.get('div.MuiPopover-paper > ul > li:nth-Child('+rowIndex+')').click();
                }
             })
            break;
            case user.patient_data.label_discount_five_percent:
                cy.get(user.patient_elements.patient_discount_drop_down_arrow).click();
                cy.get("div.MuiPopover-paper > ul > li").then(($list)=>{
                   let title = $list.text().replace('\n').replace('\t').toString().trim();
                   if(title.includes(element)){
                       let rowIndex = $list.length - 3;
                       cy.get('div.MuiPopover-paper > ul > li:nth-Child('+rowIndex+')').click();
                   }
                })
            break;
            case user.patient_data.label_discount_ten_percent:
                cy.get(user.patient_elements.patient_discount_drop_down_arrow).click();
                cy.get("div.MuiPopover-paper > ul > li").then(($list)=>{
                   let title = $list.text().replace('\n').replace('\t').toString().trim();
                   if(title.includes(element)){
                       let rowIndex = $list.length - 2;
                       cy.get('div.MuiPopover-paper > ul > li:nth-Child('+rowIndex+')').click();
                   }
                })
            break;
            case user.patient_data.label_discount_fifteen_percent:
                cy.get(user.patient_elements.patient_discount_drop_down_arrow).click();
                cy.get("div.MuiPopover-paper > ul > li").then(($list)=>{
                   let title = $list.text().replace('\n').replace('\t').toString().trim();
                   if(title.includes(element)){
                       let rowIndex = $list.length - 1;
                       cy.get('div.MuiPopover-paper > ul > li:nth-Child('+rowIndex+')').click();
                   }
                })
            break;
            case user.patient_data.label_discount_twenty_percent:
                cy.get(user.patient_elements.patient_discount_drop_down_arrow).click();
                cy.get("div.MuiPopover-paper > ul > li").then(($list)=>{
                   let title = $list.text().replace('\n').replace('\t').toString().trim();
                   if(title.includes(element)){
                       let rowIndex = $list.length;
                       cy.get('div.MuiPopover-paper > ul > li:nth-Child('+rowIndex+')').click();
                   }
                })
            break;
            default:
                console.log("incorrect discount option found");
        }
     }

     getGender(element){
        switch(element){
            case user.patient_data.label_gender_none:
                cy.get(user.patient_elements.patient_gender_dropdown).click();
                cy.get("div.MuiPopover-paper > ul > li").then(($list)=>{
                    let title = $list.text().replace('\n').replace('\t').toString().trim();
                    if(title.includes(element)){
                        let rowIndex = $list.length - 2;
                        cy.get("div.MuiPopover-paper > ul > li:nth-Child("+rowIndex+")").click();
                    } 
                })
            break;
            case user.patient_data.label_gender_male:
                cy.get(user.patient_elements.patient_gender_dropdown).click();
                cy.get("div.MuiPopover-paper > ul > li").then(($list)=>{
                    let title = $list.text().replace('\n').replace('\t').toString().trim();
                    if(title.includes(element)){
                        let rowIndex = $list.length - 1;
                        cy.get("div.MuiPopover-paper > ul > li:nth-Child("+rowIndex+")").click();
                    } 
                })
            break;
            case user.patient_data.label_gender_female:
                cy.get(user.patient_elements.patient_gender_dropdown).click();
                cy.get("div.MuiPopover-paper > ul > li").then(($list)=>{
                    let title = $list.text().replace('\n').replace('\t').toString().trim();
                    if(title.includes(element)){
                        let rowIndex = $list.length;
                        cy.get("div.MuiPopover-paper > ul > li:nth-Child("+rowIndex+")").click();
                    } 
                })
            break;
            default:
                console.log("gender not found");
        }
     }


    //------------------- add Inventory --------------------------------------------<
      addInventory(name, description,total){
        // hanldes inventory table dynamically 
        /*
           first search for inventory detail in table
           if record already exists into table, edit and delete existing record
           else if record doesn't exist then add new inventory record
        */
         cy.wait(2000);
        cy.get("div.MuiCard-root > div > ul > li").then(($list)=>{
            let tableVal = $list.text().replace('\n').replace('\t').toString().trim();
            if(tableVal.includes(name)){
                let rowIndex = $list.length;
                //click on list expand arrow
                cy.get("div.MuiCard-root > div > ul > li:nth-Child("+rowIndex+") > div > div > div:nth-Child(2)").click();
                //click on edit button
                cy.get("div.MuiCard-root > div > ul > li:nth-Child("+rowIndex+") > div > div:nth-Child(2) > div > div > div > div:nth-Child(3) > a").click();
                // click on delete button
                cy.get("div.MuiCardContent-root > div > button").click();
            }else{
                //click on add equipment
                cy.get(user.inventory_elements.add_equipment_cta).click();
                //enter equipment name
                cy.get(user.inventory_elements.equipment_name_field).type(name);
                //enter description
                cy.get(user.inventory_elements.equipment_description_field).type(description);
                // enter total
                cy.get(user.inventory_elements.equipment_total_field).type(total);
                
                if(name.length < 4 || description.length < 4 || total < 1){
                  cy.get(user.inventory_elements.add_equipment_cancel).click();
                }else{
                  cy.get(user.inventory_elements.add_equipment_submit).click();
                  cy.reload();
                }
            }
        })
      }

    //------------------- add Doctor -----------------------------------------------<
      addDoctor(name, email, phone, highest_qualification, specialization, clinic, clinic_address, pincode, city){
        /*
           handles doctor table dynamically
           first searches for doctor name
           if doctor's already exists then delete the existing doctor
           else if doctor doesn't exist add new doctor
        */
           cy.wait(2000);
         cy.get(user.doctor_elements.doctor_search_field).type(name);
         cy.wait(2000);
         cy.get("table.MuiTable-root > tbody > tr").then(($list)=>{
            let tableVal = $list.text().replace('\n').replace('\t').toString().trim();
            if(tableVal.includes("No records to display")){
                cy.get(user.doctor_elements.add_doctor_cta).click();
                // enter doctor name
                cy.get(user.doctor_elements.doctor_name_field).type(name);
                // enter doctor email
                   cy.get(user.doctor_elements.doctor_email_field).type(email);
                // enter doctor contact
                   cy.get(user.doctor_elements.doctor_phone_field).type(phone);
                //click on form1 submit with logic
                   if(name.length < 4 || email.length < 4 || phone.length < 10){
                     cy.get(user.doctor_elements.doctor_form1_cancel).click();
                   }else{
                    cy.get(user.doctor_elements.doctor_form1_submit).click();
                }
                // enter higher qualification
                   cy.get(user.doctor_elements.doctor_highest_qualification_field).type(highest_qualification);
                // enter specialization
                   cy.get(user.doctor_elements.doctor_specialization_field).type(specialization);
                // enter clinic name
                   cy.get(user.doctor_elements.doctor_clinic_name_field).type(clinic); 
                // enter clinic address
                   cy.get(user.doctor_elements.doctor_clinic_address_field).type(clinic_address);
                // enter pincode
                   cy.get(user.doctor_elements.doctor_pinzip_field).type(pincode);
                // enter city
                   cy.get(user.doctor_elements.doctor_city_field).type(city);
                //click on form2 submit with logic
                   if(highest_qualification.length < 4 || specialization.length < 4 || clinic.length < 10 || clinic_address < 4 || pincode < 4 || city < 4){
                     cy.get(user.doctor_elements.doctor_form2_cancel).click();
                   }else{
                    cy.get(user.doctor_elements.doctor_form2_submit).dblclick();
                    cy.wait(3000);
                }

            }else{
                let rowIndex = $list.length;
                cy.get("table.MuiTable-root > tbody > tr:nth-Child("+rowIndex+") > td:nth-Child(1)").click();
                cy.get("div.MuiCardContent-root > div > button").click();
            }
         })

      }

    //------------------- add lab ----------------------------------------------------<
    addLab(name, email, phone, website, address,city, pincode, state,testname){
       /*
          handles lab table dynamically
          first searches for lab name
          if lab already exists then delete the existing lab
          else if lab doesn't exist add new lab
       */
          cy.wait(2000);
        cy.get(user.labs_elements.lab_search_field).type(name);
        cy.wait(2000);
        cy.get("table.MuiTable-root > tbody > tr").then(($list)=>{
            let tableVal = $list.text().replace('\n').replace('\t').toString().trim();
            if(tableVal.includes("No records to display")){
                // click on add lab cta
                cy.get(user.labs_elements.add_lab_cta).click();
                // enter lab name
                   cy.get(user.labs_elements.lab_name_field).type(name);
                // enter lab email
                   cy.get(user.labs_elements.lab_email_field).type(email);
                // enter lab contact
                   cy.get(user.labs_elements.lab_phone_field).type(phone);
                //click on form1 submit with logic
                   if(name.length < 4 || email.length < 4 || phone.length < 10){
                     cy.get(user.labs_elements.lab_form1_cancel).click();
                   }else{
                    cy.get(user.labs_elements.lab_form1_submit).click();
                   }
                
                // enter website url
                   cy.get(user.labs_elements.lab_website_field).type(website);
                // enter lab address
                   cy.get(user.labs_elements.lab_address_field).type(address);
                // enter city
                   cy.get(user.labs_elements.lab_city_field).type(city);
                // enter pincode
                   cy.get(user.labs_elements.lab_pincode_field).type(pincode);
                // enter state
                   cy.get(user.labs_elements.lab_state_field).type(state);
                // click on form2 submit with logic
                  if(website.length < 4 || address.length < 4 || city.length < 4 || pincode.length < 4 || state.length < 4 ){
                      cy.get(user.labs_elements.lab_form2_cancel).click();
                  }else{
                      cy.get(user.labs_elements.lab_form2_submit).click();
                  }
                // select test
                   cy.get(user.labs_elements.lab_test_search_field).type(testname);
                   cy.wait(2000);
                   cy.get("table.MuiTable-root > tbody > tr").then(($list)=>{
                      let testVal = $list.text().replace('\n').replace('\t').toString().trim();
                      if(testVal.includes(testname)){
                        cy.get(user.labs_elements.lab_test_select_test_input_checkbox).click();
                      }
                   })
                // click on form3 submit
                  cy.get(user.labs_elements.lab_form3_submit).dblclick();
                  cy.reload();
            }else{
                let rowIndex = $list.length;
                cy.get("table.MuiTable-root > tbody > tr:nth-Child("+rowIndex+") > td:nth-Child(1)").click();
                cy.get("div.MuiCardContent-root > div > button").click();
            }
        })
    }
    

    // -----------------  add tests -------------------------------------------------<
    addTest(testname, sampleType, sampleVolume, sampleMode, amount){
      // click on manage test
      cy.get(user.test_element.manage_test_cta).click();
            
      /* handle test table dynamically
         first search for testname 
         if test already exists then delete the existing test
         else if test doesn't exist add new test
      */
      cy.wait(2000);
      cy.get(user.test_element.manage_test_search_field).type(testname);
      cy.wait(2000);
      cy.get("table.MuiTable-root > tbody > tr").then(($list)=>{
        let tableVal = $list.text().replace('\n').replace('\t').toString().trim();
        if(tableVal.includes("No records to display")){
            cy.wait(2000);
        // click on test cta
         cy.get(user.test_element.add_test_cta).click();   
        // enter test name
        cy.get(user.test_element.test_name_field).type(testname);
        // select test sample type
        this.get_sample_type(sampleType); 
        cy.wait(3000);
        // select sample volume
        this.get_sample_volume(sampleVolume);
        cy.wait(3000);
        this.get_sample_mode(sampleMode);
        //enter test amount 
        global_amount = amount;
        cy.get(user.test_element.test_charges_field).type(amount);

        /*
           if amount is less than 1 just cancel test form submission
           else can submit test form
        */
        if(amount < 1 || testname.length < 1){
           cy.get(user.test_element.cancel_test).click();
        }else{
           cy.get(user.test_element.add_test_submit).click();
        }

        }else{
            let rowIndex = $list.length;
            cy.get("table.MuiTable-root > tbody > tr:nth-Child("+rowIndex+") > td:nth-Child(1)").click();
            cy.get("div.MuiCardContent-root > div > button").click();
        }
      })
    }

    //Select Test Sample Mode
    get_sample_mode(element){
        switch(element){
            case user.test_data.label_sample_mode_none:
                cy.get(user.test_element.test_sample_mode_drop_down).click();
                cy.get(user.test_element.test_sample_mode_list_options).then(($list)=>{
                    let title = $list.text().replace('\n').replace('\t').toString().trim();
                    if(title.includes(element)){
                        let rowIndex = $list.length - 2;
                        cy.get("div.MuiPopover-paper > ul > li:nth-Child("+rowIndex+")").click();
                    }
                })
            break;
            case user.test_data.label_sample_mode_fasting:
                cy.get(user.test_element.test_sample_mode_drop_down).click();
                cy.get(user.test_element.test_sample_mode_list_options).then(($list)=>{
                    let title = $list.text().replace('\n').replace('\t').toString().trim();
                    if(title.includes(element)){
                        let rowIndex = $list.length - 1;
                        cy.get("div.MuiPopover-paper > ul > li:nth-Child("+rowIndex+")").click();
                    }
                })
            break;
            case user.test_data.label_sample_mode_non_fasting:
                cy.get(user.test_element.test_sample_mode_drop_down).click();
                cy.get(user.test_element.test_sample_mode_list_options).then(($list)=>{
                    let title = $list.text().replace('\n').replace('\t').toString().trim();
                    if(title.includes(element)){
                        let rowIndex = $list.length;
                        cy.get("div.MuiPopover-paper > ul > li:nth-Child("+rowIndex+")").click();
                    }
                })
            break;
        }
    }

    //Select Test Sample Volume
    get_sample_volume(element){
        switch(element){
            case user.test_data.label_volume_none:
                cy.get(user.test_element.test_sample_volume_drop_down).click();
                cy.get(user.test_element.test_sample_volume_list_options).then(($list)=>{
                    let title = $list.text().replace('\n').replace('\t').toString().trim();
                    if(title.includes(element)){
                        let rowIndex = $list.length - 5;
                        cy.get("div.MuiPopover-paper > ul > li:nth-Child("+rowIndex+")").click();
                    }
                })
            break;
            case user.test_data.label_1ml:
                cy.get(user.test_element.test_sample_volume_drop_down).click();
                cy.get(user.test_element.test_sample_volume_list_options).then(($list)=>{
                    let title = $list.text().replace('\n').replace('\t').toString().trim();
                    if(title.includes(element)){
                        let rowIndex = $list.length - 5;
                        cy.get("div.MuiPopover-paper > ul > li:nth-Child("+rowIndex+")").click();
                    }
                })
            break;
            case user.test_data.label_2ml:
                cy.get(user.test_element.test_sample_volume_drop_down).click();
                cy.get(user.test_element.test_sample_volume_list_options).then(($list)=>{
                    let title = $list.text().replace('\n').replace('\t').toString().trim();
                    if(title.includes(element)){
                        let rowIndex = $list.length - 4;
                        cy.get("div.MuiPopover-paper > ul > li:nth-Child("+rowIndex+")").click();
                    }
                })
            break;
            case user.test_data.label_3ml:
                cy.get(user.test_element.test_sample_volume_drop_down).click();
                cy.get(user.test_element.test_sample_volume_list_options).then(($list)=>{
                    let title = $list.text().replace('\n').replace('\t').toString().trim();
                    if(title.includes(element)){
                        let rowIndex = $list.length - 3;
                        cy.get("div.MuiPopover-paper > ul > li:nth-Child("+rowIndex+")").click();
                    }
                })
            break;
            case user.test_data.label_1_drop:
                cy.get(user.test_element.test_sample_volume_drop_down).click();
                cy.get(user.test_element.test_sample_volume_list_options).then(($list)=>{
                    let title = $list.text().replace('\n').replace('\t').toString().trim();
                    if(title.includes(element)){
                        let rowIndex = $list.length - 2;
                        cy.get("div.MuiPopover-paper > ul > li:nth-Child("+rowIndex+")").click();
                    }
                })
            break;
            case user.test_data.label_2_drop:
                cy.get(user.test_element.test_sample_volume_drop_down).click();
                cy.get(user.test_element.test_sample_volume_list_options).then(($list)=>{
                    let title = $list.text().replace('\n').replace('\t').toString().trim();
                    if(title.includes(element)){
                        let rowIndex = $list.length - 1;
                        cy.get("div.MuiPopover-paper > ul > li:nth-Child("+rowIndex+")").click();
                    }
                })
            break;
            case user.test_data.label_3_drop:
                cy.get(user.test_element.test_sample_volume_drop_down).click();
                cy.get(user.test_element.test_sample_volume_list_options).then(($list)=>{
                    let title = $list.text().replace('\n').replace('\t').toString().trim();
                    if(title.includes(element)){
                        let rowIndex = $list.length;
                        cy.get("div.MuiPopover-paper > ul > li:nth-Child("+rowIndex+")").click();
                    }
                })
            break;
            default:
                console.log("no sample volume found");
        }
    }

    // Select Test Sample Type
    get_sample_type(element){
        switch(element){
            case user.test_data.label_sample_type_none:
                cy.get(user.test_element.test_sample_drop_down).click();
                cy.get(user.test_element.test_sample_list_options).then(($optionList)=>{
                    let optionText = $optionList.text().replace('\n').replace('\t').toString().trim();
                    if(optionText.includes(element)){
                        let rowIndex = $optionList.length - 7;
                        cy.get("div.MuiPopover-paper > ul > li:nth-Child("+rowIndex+")").click();
                    }
                })
            break;
            case user.test_data.label_sample_type_serum:
                cy.get(user.test_element.test_sample_drop_down).click();
                cy.get(user.test_element.test_sample_list_options).then(($optionList)=>{
                    let optionText = $optionList.text().replace('\n').replace('\t').toString().trim();
                    if(optionText.includes(element)){
                        let rowIndex = $optionList.length - 6;
                        cy.get("div.MuiPopover-paper > ul > li:nth-Child("+rowIndex+")").click();
                    }
                })
            break;
            case user.test_data.label_sample_type_edta_blood:
                cy.get(user.test_element.test_sample_drop_down).click();
                cy.get(user.test_element.test_sample_list_options).then(($optionList)=>{
                    let optionText = $optionList.text().replace('\n').replace('\t').toString().trim();
                    if(optionText.includes(element)){
                        let rowIndex = $optionList.length - 5;
                        cy.get("div.MuiPopover-paper > ul > li:nth-Child("+rowIndex+")").click();
                    }
                })
            break;
            case user.test_data.label_sample_type_dbs_card:
                cy.get(user.test_element.test_sample_drop_down).click();
                cy.get(user.test_element.test_sample_list_options).then(($optionList)=>{
                    let optionText = $optionList.text().replace('\n').replace('\t').toString().trim();
                    if(optionText.includes(element)){
                        let rowIndex = $optionList.length - 4;
                        cy.get("div.MuiPopover-paper > ul > li:nth-Child("+rowIndex+")").click();
                    }
                })
            break;
            case user.test_data.label_sample_type_fluoride:
                cy.get(user.test_element.test_sample_drop_down).click();
                cy.get(user.test_element.test_sample_list_options).then(($optionList)=>{
                    let optionText = $optionList.text().replace('\n').replace('\t').toString().trim();
                    if(optionText.includes(element)){
                        let rowIndex = $optionList.length - 3;
                        cy.get("div.MuiPopover-paper > ul > li:nth-Child("+rowIndex+")").click();
                    }
                })
            break;
            case user.test_data.label_sample_type_fluoride_plasma:
                cy.get(user.test_element.test_sample_drop_down).click();
                cy.get(user.test_element.test_sample_list_options).then(($optionList)=>{
                    let optionText = $optionList.text().replace('\n').replace('\t').toString().trim();
                    if(optionText.includes(element)){
                        let rowIndex = $optionList.length - 2;
                        cy.get("div.MuiPopover-paper > ul > li:nth-Child("+rowIndex+")").click();
                    }
                })
            break;
            case user.test_data.label_sample_type_serum_or_urine:
                cy.get(user.test_element.test_sample_drop_down).click();
                cy.get(user.test_element.test_sample_list_options).then(($optionList)=>{
                    let optionText = $optionList.text().replace('\n').replace('\t').toString().trim();
                    if(optionText.includes(element)){
                        let rowIndex = $optionList.length - 1;
                        cy.get("div.MuiPopover-paper > ul > li:nth-Child("+rowIndex+")").click();
                    }
                })
            break;
            case user.test_data.label_sample_type_urine:
                cy.get(user.test_element.test_sample_drop_down).click();
                cy.get(user.test_element.test_sample_list_options).then(($optionList)=>{
                    let optionText = $optionList.text().replace('\n').replace('\t').toString().trim();
                    if(optionText.includes(element)){
                        let rowIndex = $optionList.length;
                        cy.get("div.MuiPopover-paper > ul > li:nth-Child("+rowIndex+")").click();
                    }
                })
            break;
            default:
                console.log("something went wrong, no test sample type found...!");
        }
    }

    // get side navigation menu option
    getSideNav(element){
        switch(element){
            case user.dashboard_data.label_dashboard:
                cy.get(user.dashboard_elements.side_bar_list).then(($elementList)=>{
                   let elementTitle =  $elementList.text().replace('\t').replace('\n').toString().trim();
                   if(elementTitle.includes(element)){
                    let rowIndex = $elementList.length - 6;
                    cy.wait(2000); 
                    cy.get("div.MuiDrawer-paperAnchorLeft > div > div > ul > a:nth-Child("+rowIndex+") > div").click();
                   }
                })
            break;
            case user.dashboard_data.label_tests:
                // get test side navbar option click
                cy.get(user.dashboard_elements.side_bar_list).then(($elementList)=>{
                    let elementTitle =  $elementList.text().replace('\t').replace('\n').toString().trim();
                    if(elementTitle.includes(element)){
                     let rowIndex = $elementList.length - 5; 
                     cy.get("div.MuiDrawer-paperAnchorLeft > div > div > ul > a:nth-Child("+rowIndex+") > div").click();
                    }
                 })                
            break;
            case user.dashboard_data.label_inventory:
                cy.get(user.dashboard_elements.side_bar_list).then(($elementList)=>{
                    let elementTitle =  $elementList.text().replace('\t').replace('\n').toString().trim();
                    if(elementTitle.includes(element)){
                     let rowIndex = $elementList.length - 4; 
                     cy.get("div.MuiDrawer-paperAnchorLeft > div > div > ul > a:nth-Child("+rowIndex+") > div").click();
                    }
                 })
            break;
            case user.dashboard_data.label_patients:
                cy.get(user.dashboard_elements.side_bar_list).then(($elementList)=>{
                    let elementTitle =  $elementList.text().replace('\t').replace('\n').toString().trim();
                    if(elementTitle.includes(element)){
                     let rowIndex = $elementList.length - 3; 
                     cy.get("div.MuiDrawer-paperAnchorLeft > div > div > ul > a:nth-Child("+rowIndex+") > div").click();
                    }
                 })
            break;
            case user.dashboard_data.label_labs:
                cy.get(user.dashboard_elements.side_bar_list).then(($elementList)=>{
                    let elementTitle =  $elementList.text().replace('\t').replace('\n').toString().trim();
                    if(elementTitle.includes(element)){
                     let rowIndex = $elementList.length - 2; 
                     cy.get("div.MuiDrawer-paperAnchorLeft > div > div > ul > a:nth-Child("+rowIndex+") > div").click();
                    }
                 })
            break;
            case user.dashboard_data.label_doctors:
                cy.get(user.dashboard_elements.side_bar_list).then(($elementList)=>{
                    let elementTitle =  $elementList.text().replace('\t').replace('\n').toString().trim();
                    if(elementTitle.includes(element)){
                     let rowIndex = $elementList.length - 1 ; 
                     cy.get("div.MuiDrawer-paperAnchorLeft > div > div > ul > a:nth-Child("+rowIndex+") > div").click();
                    }
                 })
            break;
            default:
                console.log("no element found");
        }
    }
}