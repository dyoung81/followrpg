const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const mongoose = require("mongoose")
const routes = require("./routes")
mongoose
	.connect(process.env.DB_CONNECT,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
	.then(() => {
        app.use(cors())
        app.use(express.json())
		app.use("/api", routes)
		app.listen(5000, () => {
			console.log("Server has started!")
		})
	})