const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

dbUri = "mongodb+srv://haris:haris@node-test.m24e60j.mongodb.net/?retryWrites=true&w=majority&appName=node-crash-course"

// exprees app

const app = express();

// connect to database
mongoose.connect(dbUri).then((x)=>
{
    console.log("connected")
}).catch((err)=>{
    console.log(err)
})

app.set('view engine', 'ejs')

app.listen(3000)

app.use(express.static('public'))
app.use(morgan('dev'));

app.get('/', (req,res)=>{
    res.redirect('/blogs');
})

app.get('/blogs', (req,res)=>{
    Blog.find().sort({createdAt: -1})
        .then((response)=>{
            res.render('index', { title: "Home", blogs: response})
        })
        .catch((err)=>{
            console.log(err);
        })
})

app.get('/about', (req,res)=>{
    
    res.render('about', { title: "About" })
})

app.get('/create', (req,res)=>{
    
    res.render('create', { title: "Create" })
})

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
