require("dotenv").config()

const express = require("express");
let app = express();

const bodyParser = require('body-parser');  
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' }));

const mongoose = require("mongoose");
const uri = process.env.URI;
mongoose.connect(uri)

.then(()=>{
    app.listen("80",()=>{
        console.log("listening on http://localhost:80");
    })
})
.catch(()=>{
    console.log("err!");
})



const User = require("./models/user");
const jwt = require("jsonwebtoken");
const key = process.env.ACCESS_TOKEN

app.post("/login", async (req, res) => {
    const {email,name} = req.body;
    const token = jwt.sign({ email: email }, key);
    
    try {
        const user = await User.findOne({ email: email });
        // console.log( user && "user found");
        if (!user) {
            const user = new User({ email, name });
            await user.save();
            console.log( "new user created");
            return res.status(401).json({ message: "User not found" });
        }

        res.json({ token: token, user: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});




const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "no token found" });
    }

    try {
        const decoded = jwt.verify(token, key);
        req.user = decoded;
        next(); 
    } catch (error) {
        console.error(error);
        res.status(403).json({ message: "unverified tokem" });
    }
};

app.get("/verify", verifyToken, (req, res) => {
    res.status(200).json({ message: "verified", user: req.user });
});

