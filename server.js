const express = require("express");
const { type } = require("express/lib/response");
const mongo = require("mongodb").MongoClient;

const app = express();


const url = "mongodb+srv://admin:admin@cluster0.vw1lt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

let db, orders;

mongo.connect(
    url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err, client) => {
        if (err) {
            console.error(err);
            return
        }
        db = client.db("orderhistory");
        orders = db.collection("orders");
    }
)
app.use(express.json());
app.post("/orders", (req, res) => {
    let body = req.body;
    orders.insertOne({ id: body.id, title: body.title, date: body.date, type: body.type, customer: body.customer }, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ err: err });
            return
        }
        res.status(200).json({ result });
    })

})

app.get("/orders/:id", (req, res) => {
    orders.find({ id: req.params.id }).toArray((err, items) => {
        if (err) {
            console.error(err);
            res.status(500).json({ err: err });
            return
        }
        res.status(200).json({ orders: items });
    })
})

app.get("/orders/", (req, res) => {
    orders.find().toArray((err, items) => {
        if (err) {
            console.error(err);
            res.status(500).json({ err: err });
            return
        }
        res.status(200).json({ orders: items });
    })
})

app.get("/orders/:type/:date", (req, res) => {

    orders.find({ type: req.params.type, date: req.params.date }).toArray((err, items) => {
        if (err) {
            console.error(err);
            res.status(500).json({ err: err });
            return
        }
        const ordersArr = [],
            customersArr = [];
        items.forEach((item) => ordersArr.push(item.id));
        items.forEach((item) => customersArr.push(item.customer));

        res.status(200).json({
            type: req.params.type,
            count: items.length,
            orders: ordersArr.slice(-10),
            related_customers: [...new Set(customersArr)]
        });
    })
})

app.listen(3000, () => console.log("Server ready"));