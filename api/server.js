const express = require('express');
const actionsRouter = require("./actions/actions-router")
const projectsRouter = require("./projects/projects-router")
const welcomeRouter = require("./welcome/welcome-router")
const server = express();

// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use(express.json())
server.use(welcomeRouter)
server.use(projectsRouter)
server.use(actionsRouter)

module.exports = server;
