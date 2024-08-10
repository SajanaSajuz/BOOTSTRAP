AdminRouter.post( "/addpost", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.Password, 12);
        console.log(hashedPassword);
        let log = {Username: req.body.Username, Password:hashedPassword, Role:3 } 
        const result = await logModel(log).save()
let reg = { Title: req.body.Title, Image: req.body.Image, Description: req.body.Description, Authorname: req.body.Authorname, Email: req.body.Email,}
            
const result2 = await adminModel(reg).save()
if (result2) {
res.status(201).json({ success: true, error: false, message: "Post added", details: result2 });
}

} catch (error) {
res.status(500).json({ success: false, error: true, message: "Something went wrong" });
console.log(error);
}

});

login
var express = require('express');
const RegisterRouter = express.Router()
const regModel = require('../models/regModel')
const logModel = require('../models/logModel');
const  mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
RegisterRouter.post("/", async (req, res) => {
    try {

        const oldUser = await logModel.findOne({ Name: req.body.Name });
        console.log(req.body.Password)
        if (oldUser) {
            return res.status(400).json({ success: false, error: true, message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(req.body.Password,8);
        
        let log = { Name: req.body.Name, Password: hashedPassword, Role: 2 }
        const result = await logModel(log).save()
        let reg = { Login_id: result._id, Name: req.body.Name, Email:req.body.Email ,Password:req.body.Password }

        const result2 = await regModel(reg).save()
        console.log(result2);
        if (result2) {
            res.status(200).json({ success: true, error: false, message: "Registration completed", details: result2 });
        }

    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong" });
        console.log(error);
    }

});






module.exports = RegisterRouter;