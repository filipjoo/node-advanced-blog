const express = require("express")
const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
const mongoose = require("mongoose")
const session = require("express-session")
const routers = require("./routes")

app.set("view engine", "ejs")
app.use("/public", express.static("public"))

//session
app.use(session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: false,
    cookie:{ maxAge: 300000},
}))

//.env読み込み
require('dotenv').config()
db_host = process.env.DB_HOST
db_pass = process.env.DB_PASS

//Connecting to MongoDB
db_url = "mongodb+srv://" + db_host + ":" + db_pass + "@cluster0.rh17yru.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(db_url)
    .then(() => {
        console.log("Success: MongoDBに接続成功")
    })
    .catch((error) => {
        console.error("Failure: 接続失敗")
    })

app.use(routers)

//page notfount
app.get("*", (req, res) => {
    res.render("error", {message: "ページが存在しません"})
})

const port = process.env.PORT || 5000

app.listen(5000, () => {
    console.log("5000番ポートでListen中")
})
