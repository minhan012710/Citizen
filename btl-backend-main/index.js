const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const cors = require("cors");
require('dotenv').config();

const adminRouting = require("./A/router/routing");
const provinceRouting = require("./Province/router/routing");
const civilianRouting = require("./User/router/routing");


app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use(cors());
// config datbase
const dbURL = process.env.mongodbURL;
mongoose.connect(
    dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(
    (result) => console.log("connect to database success!")
).catch((err) => console.log(err));

// settings router
// app.get('/',function(req, res) {
//     res.sendFile('views/html/homepage.html', {root: __dirname })
// });
// app.use((req, res) => {
//     res.status(404).sendFile('views/html/homepage.html', {root: __dirname })
//   });
app.use('/civilian', civilianRouting);
app.use("/admin",adminRouting);
app.use("/province",provinceRouting);

console.log("You listen port:" + process.env.PORT);

app.listen(process.env.PORT);