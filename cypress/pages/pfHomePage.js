class pfHomePage {
  elements = {

    //Scenerio 1

    propertyTypeDropDown: () => cy.get('[data-testid="filters-form-dropdown-property-type"]'),
    typeDropDown: () => cy.get('[class="styles-module_dropdown-content__item__thioe"]'),
    searchButton: () => cy.get('[type="button"]').contains('Find'),
    verifyList: () => cy.get('[data-testid="property-search-h1-content-title"]'),
    priceDropDown:() => cy.get('[data-testid="filters-form-dropdown-price"]'),
    maXPriceRange:() => cy.get('[data-testid="filters-form-range-dropdown-to-input"]'),
    rentalPeriod: () => cy.contains('Rental Period'),

    //Scenerio 2

    commercialPropertiesCheckBox:() => cy.get('[class="checkbox-component__label filter-form-component-variant__checkbox-label"]'),
    categoryDropDown:() => cy.get('[data-testid="filters-form-dropdown-category-type"]'),
    selectOffices:() => cy.contains('Offices')

  };

  selectVillaPropertyType() {
    this.elements.propertyTypeDropDown().click();
    this.elements.typeDropDown().contains("Villa").click({force: true});
    this.elements.searchButton().click()
    cy.wait(10000)
  }

  verifyVillasList() {
    this.elements.verifyList().contains('Villas for rent in Bahrain').should('be.visible');
  }

  maxPriceRange() {
    this.elements.priceDropDown().click({force: true});
    this.elements.maXPriceRange().click({force: true}).type('300000');
    this.elements.rentalPeriod().click({force: true});
    // this.elements.priceDropDown().click({force: true});
    this.elements.searchButton().click({force: true});
  }

  verifyResults(){

    let apiResponseTotal;
    let displayedTotal;

    cy.request("GET", "https://www.propertyfinder.bh/_next/data/uYI1dhwoXpcJ8tiQv-m5K/en/search.json?c=2&t=35&pt=300000&fu=0&rp=m&ob=mr").then((response) => {
      // calculating total number of results by using foreach loop since there is no total results in APU
      apiResponseTotal = response.body.totalResults;
      response.body.pageProps.pageMeta.aggregationLinks.forEach((item) => {
        apiResponseTotal += item.count;})

    });

//Since the results are shown in lable and the calculations are made on UI. It would take alot more time to separate the string to get Total results
    cy.get('[aria-label="Search results count"]').then((results) => {
      displayedTotal = results.length;
    });

    expect(apiResponseTotal).to.equal(displayedTotal);
  }

    

  checkCommercialPropertiesAndSearch(){
    this.elements.categoryDropDown().click({force: true})
    this.elements.typeDropDown().contains('Commercial buy').click({force: true})
    this.elements.searchButton().click()
    this.elements.searchButton().click()
    cy.wait(5000)
  }

  verifyCommercialPropertyResults(){
    this.elements.verifyList().contains('Commercial properties for sale in Bahrain').should('be.visible');
  }

  selectOfficeCategory(){
    this.elements.selectOffices().click({force: true})
  }

  verifyTotalNoOfResults(){
    let displayedTotal;
    let apiResponseTotal = 0;

    cy.request("GET", "https://www.propertyfinder.bh/_next/data/uYI1dhwoXpcJ8tiQv-m5K/en/search.json?c=3&t=4&fu=0&ob=mr").then((response) => {
      
    // calculating total number of results by using foreach loop since there is no total results in APU
      apiResponseTotal = response.body.totalResults;
      response.body.pageProps.pageMeta.aggregationLinks.forEach((item) => {
        apiResponseTotal += item.count;
      })

    });

    //Since the results are shown in lable and the calculations are made on UI. It would take alot more time to separate the string to get Total results
    cy.get('[aria-label="Search results count"]').then((results) => {
      displayedTotal = results.length;
    });

    expect(apiResponseTotal).to.equal(displayedTotal);
  }

  verifyDetailOfFirstProperty(){

  }
}

export const pfHome = new pfHomePage();
