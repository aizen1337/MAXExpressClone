const Express = require('express')
const getAllBurgers = require("./controllers/BurgersController")
require('dotenv').config()
const server = Express()
const app = require('./firebase/firebaseConfig')
server.listen(process.env.PORT, () => {
    if(app) {
    console.log(`App is listening on port ${process.env.PORT}`)
    }
    else {
        throw new Error("Failed to initialize")
    }
})
server.use(Express.json())
server.get('/api', getAllBurgers);
