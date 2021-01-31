const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose")
const routes = require("./routes")

mongoose
	.connect(process.env.DB_CONNECT,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
	.then(() => {
        app.use(cors())
        app.use(express.json())
		app.use("/api", routes)
		app.listen(PORT, () => {
			console.log(`Server has started at ${PORT}!`)
		})
	})