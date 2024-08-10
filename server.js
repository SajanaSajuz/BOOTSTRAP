var express = require('express');
const mongoose  = require('mongoose');
var app = express();
const port = 5000
app.use(express.urlencoded({extended:true}))
const RegisterRouter = require('./src/routes/RegisterRouter');
const PostsRouter = require('./src/routes/PostsRouter');
const UserRouter = require('./src/routes/UserRouter');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const LoginRouter = require('./src/routes/LoginRouter');




app.use(bodyParser())
app.use(express.urlencoded({extended:true}))
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader( 
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


app.use('/',RegisterRouter)
app.use('/posts',PostsRouter)
app.use('/user',UserRouter)
app.use('/log',LoginRouter)
app.use('/admin',LoginRouter)

mongoose.connect('mongodb+srv://vssajanavs:vssajanavs@cluster0.w4nsh9i.mongodb.net/blogDb?retryWrites=true&w=majority').then(()=>{
app.listen(5000,()=>{
    console.log("server started at http://localhost:5000");
});
}).catch((error)=>{
    console.log(error);
})


