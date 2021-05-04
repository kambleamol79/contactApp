require('dotenv').config();
const express = require('express');
const bodyParser=require("body-parser");
const cors=require("cors");
const app = express();

//parse json/application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Router
const contactRouter = require("./routes/contact.router");
const { json } = require('body-parser');

// cors
app.use(cors());

app.use("/contact", contactRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`)
})