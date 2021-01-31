const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose")
const routes = require("./routes")

if (process.env.NODE_ENV === 'production'){
    app.use(express.static('../build'))
}

mongoose
	.connect(process.env.MONGODB_URL,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
	.then(() => {
        app.use(cors())
        app.use(express.json())
		app.use("/api", routes)
		app.listen(PORT, () => {
			console.log(`Server has started at ${PORT}!`)
		})
	})