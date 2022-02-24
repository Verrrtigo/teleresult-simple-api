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

The second endpoint `GET /orders/{id}` returns the JSON representation of the orders. ID is any alphanumerical ID that has been assigned on order creation. Example request: `GET /orders/13`

The third endpoint, `GET /orders/{type}/{date}` returns the list of orders of that type and that date, as well as a list of the last 10 orders of that type on that day and a list of customers who made at least one order for this type on this date orders. For example: `GET /orders/iPhone13/{date}`

Use the auxilliary endpoint `GET /orders` to get a list of all orders

The simplest way to call the API is using [Insomnia](https://insomnia.rest/download) or a similar API testing app. Alternatively, you can just navigate to the endpoint URL in your browser to see the response JSON.
