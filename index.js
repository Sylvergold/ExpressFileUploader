const express = require ('express');
const mongoose = require('mongoose');
require('dotenv').config();
const router = require("./router/router");
const fileUpload = require("express-fileupload");
const PORT = process.env.PORT;
const URI = process.env.DATABASE;
const app = express();

app.use(express.json());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.use("/api/v1", router)

mongoose.connect(URI).then(() => {
    console.log('Connection to Database is successful');
}).catch((error) => {
    console.log('Error connecting to databse', error.message);
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost: ${PORT}`);
})
