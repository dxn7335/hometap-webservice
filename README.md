# Intermediary Web Service

## Description
A Nodejs web service layer meant to run in-between the frontend app and the third party API.
I don't have much expertise with python based service work so I opted for using Nodejs since it used the language I was most comfortable in.

An added benefit would be that since the language usage between the frontend and this service layer will be similar in most cases, there is a cross over of skill.

In addition a project setup can be made to run both the front end application and this node service layer locally in tandem on different ports, allowing for easier development.

## Dependencies
- Express
- Axios
- Nodemon
- Node ver >12 (nvm is used here to maintain this)

## Installation
- If you have nvm, run `nvm use`, and the node version should get matched with the version specified in .nvmrc
- `npm install`

## How to run
- Run command `npm run dev`
- Go to `http://localhost:8080/`
- There in the network tab of the dev tools, you will see a request being made on the impromptu api indexpage to our API's property details url to sample it getting the information from a mock of the House Canary API

(this is setup in a small script made in index page template in the `/views` directory)



## Discussion

A difficult decision was needed to be made on how abstract to create the api which needed some more context on the page needing the information from House Canary.

`Task: New feature: The web app should prompt homeowners with an additional question if we believe their home has a septic system`

our call currently would look like this if we were to directly use it:
`http://localhost:8080/property/details?address=123+Main+St&zipcode=65432`

### Approach 1
If the page on the frontend will use multiple values from the details call from House Canary API, then we can opt to returning back all the data returned or allow an additional query for the dev to place in specific fields to be returned from the call. In doing so, we can allow the user to create the shape of the data returned.

ex. `http://localhost:8080/property/details?address=123+Main+St&zipcode=65432&fields=sewer,basement`

- Pros:
    - The user would only receive data required
    - Can satisfy the needs of pages that may need different data from the response in one call with the added specification.

- Cons:
    - The user is now specifying names of fields that is needed to be returned back. If we changed the third party api that is used, we will need to correlate any different field names from the old api with the new one wiith their matching counterparts. 
    (If we dont want to force any change of implementation on the frontend, a lot of time will need to be spent doing that on this service layer end just to keep this functionality) 

### Approach 2 (the chosen approach)
If the frontend app only needs the septic information from the House Canary API and nothing else, then we can just make a api endpoint just for that info. 

ex. `http://localhost:8080/property/details/hasSeptic?address=123+Main+St&zipcode=65432`

Here a specific path is added to details, notated as `/hasSeptic/`, followed by queries for the house address for the search.

- Pros:
    - Concise approach and single purpose api endpoint makes it easier to debug
    - If our third party api changes, editing this endpoint to search for the correlating sewage information will be simpler

- Cons:
    - A api call will be made to the third party endpoint that returns a lot of information and we are only using it for one field with every call made.

Because of the lack of context on what the frontend page that will be using this service includes and the less complex dev work that will be needed if House Canary's API is no longer used, I went with the second approach.


## Next steps
- An actual front end can be created to run in tandem with this Node API so that more actual use-case, real-time testing can be done.
- Swagger documentation on the API calls