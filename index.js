const http = require("http")
const express = require("express")
const socketIO = require("socket.io")

const port = process.env.PORT || 3000
let app = express()
let server = http.createServer(app)
let io = socketIO(server)

io.on("connection", socket => {
	console.log(`New user connected with id: ${socket.id}`)

	socket.on("disconnect", () => {
		console.log("User has Disconnected")
	})
})

server.listen(port, () => {
	console.log(`Server is up on port ${port}`)
})
