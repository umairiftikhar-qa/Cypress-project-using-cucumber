import {
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import {pfHome} from '@pages/pfHomePage'

Given("The user is at Property Finder search page", () => {
  //Have to add this exception because there is allot of API failures and there are many staging API's on Production
  cy.on('uncaught:exception', (err, runnable) => {
    return false 
    })
  cy.visit("/en/search");
});

When("the user selects Villas under property type and search for results", () => {
  pfHome.selectVillaPropertyType()
  
});
Then("the user should be prompted to Villas list", () => {
  pfHome.verifyVillasList()
});

When("the user sets filter price range to max 300000", () => {
  pfHome.maxPriceRange()
});
Then("verify the total number of results should be filtered accordingly", () => {
  pfHome.verifyResults()
});

When("the user Select the Show commercial properties only checkbox and click on the search icon", () => {
  pfHome.checkCommercialPropertiesAndSearch()
});

Then("the results should be populated according to the commercial properties", () => {
  pfHome.verifyCommercialPropertyResults()
});

When("the user selects Office category from the commercial list returned", () => {
  pfHome.selectOfficeCategory()
});

Then("Verify total number of results from the API response matches the total displayed property results", () => {
  pfHome.verifyTotalNoOfResults()
});

When("the user search and click Bahrain Bay location", () => {
  
});

Then("select first property and verify The Available From Date should not be empty", () => {
  
});