const express = require("express")
const Message = require("./models/Message")
const router = express.Router()

// Get all messages
router.get("/messages", async (req, res) => {
	const messages = await Message.find()
	res.send(messages)
})

router.post("/messages", async (req, res) => {
	const message = new Message({
		name: req.body.name,
		content: req.body.content,
	})
	await message.save()
	res.send(message)
})

module.exports = router