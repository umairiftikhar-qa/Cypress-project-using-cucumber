Feature: Property Finder home page

    Background:
        #Since there is no unique element on Home page so I have to redirect to search page in order to continue the test cases
        Given The user is at Property Finder search page

        #There is no option for per year rent.
    Scenario: Check the total displayed number of results for category Villas with price range more than or equal to 300,000 AED / yearly
        
        When the user selects Villas under property type and search for results
        Then the user should be prompted to Villas list

        When the user sets filter price range to max 300000
        Then verify the total number of results should be filtered accordingly

    Scenario: Click on commercial properties only checkbox and select "offices"

        When the user Select the Show commercial properties only checkbox and click on the search icon
        Then the results should be populated according to the commercial properties

        When the user selects Office category from the commercial list returned
        Then Verify total number of results from the API response matches the total displayed property results
        And Verify the details of the first property in the searched result from the API response

# Tried to search for "The Bahrain Bay" location but didn't get any results

    # Scenario: Search for property by location

    #     When the user search and click Bahrain Bay location
    #     Then select first property and verify The Available From Date should not be empty
