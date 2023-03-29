const express = require("express")
const cors = require('cors')
const mongoose = require("mongoose")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect('')

app.post("/api/register", (req, res) => {
    console.log(req.body)
    res.json({status: 'ok'})
})


app.listen(1337, () => {
    console.log("Server started on 1337...")
})