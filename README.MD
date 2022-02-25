# TELERESULT SIMPLE API

#### Installation
You will need to have [NodeJS](https://nodejs.org/en/download/) to run the project. The project was packaged using NPM, online resources such as [this one](https://enterflash.io/posts/how-to-install-nodejs-and-npm-on-windows-mac-or-linux) are available to assist with installing NPM on Mac.

To install the app, use a terminal (such as the in-built one in [Visual Studio Code](https://nodejs.org/en/download/)) and use the terminal command #npm install#. After the installation is finished, use #nodemon server.js" to run it.

The test data is already available in the connected database.

The first endpoint, `POST /orders` handles the receipt of order data in JSON format, and stores it within the service.
An order has the following attributes: id, title, date, type, and customer. For example:

```JSON
{
  "id": "1",
  "title": "new mobile order",
  "date" : "2016-09-22",
  "type" : "iPhone13",
  "customer" : "customer-1"
}

```
The order JSON should be sent in the body request.

The second endpoint `GET /orders/{id}` returns the JSON representation of the orders. ID is any alphanumerical ID that has been assigned on order creation. Example request: `GET /orders/13`

The third endpoint, `GET /orders/{type}/{date}` returns the list of orders of that type and that date, as well as a list of the last 10 orders of that type on that day and a list of customers who made at least one order for this type on this date orders. For example: `GET /orders/samsung13/2016-09-23`

Use the auxilliary endpoint `GET /orders` to get a list of all orders

Once the server is running, it will be reachable at http://localhost:3000/
Example URLs for all endpoints:

POST or GET http://localhost:3000/orders
GET http://localhost:3000/orders/13
GET http://localhost:3000/orders/samsung13/2016-09-23 


The simplest way to call the API is using [Insomnia](https://insomnia.rest/download) or a similar API testing app. Another good way is to go to the Swagger API docs for the app (path `/api-docs`)

Finally, you can just navigate to the endpoint URL in your browser to see the response JSON.

#### Description of the solution

I used NodeJS to code the server as I am most comfortable coding in JavaScript. Although I have consumed and troubleshooted APIs in my past professional experiences, this was the first time I actually built one. And it was quite fun.

I used Express as an app building framework to help avoid re-inventing the wheel, as, while minimal, it has all the function (and more) to help me set up this app. Express also has an in-built JSON parser (I was struggling using another popular parser body-parser).

I also used Nodemon to help development as it re-starts the server anytime it detects changes. As this is not a production build, nodemon will have to be used to run the server by the assessors of this task to test its functionality.

U sing the `swagger-jsdoc` and `swagger-express` packages, I added a minimal Swagger (Open API) style documentation, as it is relatively easy to set up, easy to read, and is a well recognised industry standard. As well as that, it offers the option to make calls to the API from the docs itself, which is quite handy.

Having little experience with testing (and admitting it's a gap in my consideration of myself as a professional) and due to time constraints I have decided not to include tests in this version of the task.

For the file structure, again, having no hands-on experience with building Node APIs prior to this task, I have opted for a very simple file structure, which could be considred monolithic and clumsy. Due to lack of time and experience I have decided not to modularise (as this is a very small app and time spent on it, in my opinion, would give diminishing returns in this case)

The error handling is somewhat lacking as well - currently any unexpected error crashes the server and returns 500. This could be updated when requirements and specifications for both input and output are known and not assumed.

I used MongoDB for the data model. This is another first for me on this project, having previously used only MySQL and PostGreSQL. It was very fun learning Mongo, as I am fond of having JavaScript as the main language throughout the whole MVC structure of an app. The test data is already filled in as described above.

I have considered attaching a React-based UI to test the API endpoints and display the results, but due to time constrains I have opted for Swagger for this purpose.

The main resource used for the project, other than official documentation for MongoDB and Express, were these articles:
https://flaviocopes.com/rest-api-express-mongodb/
https://javascript.plainenglish.io/how-to-implement-and-use-swagger-in-nodejs-d0b95e765245

#### Assumptions

Data validation is another thing I neglected. Currently there is no handling of input that is not in the expected format. In fact, there is no expected format, but the assumption is that a unified format for order and customer ids, as well as date and type will be used when POSTing new orders and then GETing them.