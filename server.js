const { application } = require('express')
const express = require('express')
const blogRouter = require('./routes/blogs')
const page = express()
const mongoose = require('mongoose')
const Article = require('./models/article')
const methodOverride = require('method-override')

require('dotenv').config({ path: 'variables.env' })

console.log(process.env.dbURL)

mongoose.connect(process.env.dbURL,
{useNewUrlParser: true, useUnifiedTopology: true})


page.use(express.static("styles"))

page.set('view engine', 'ejs')
page.use(express.urlencoded({extended: false}))
page.use(methodOverride('_method'))

page.get('/',async (req,res)=>{
    const blogs = await Article.find().sort({date: 'desc'})
    res.render('articles/index', { blogs: blogs})
})

page.use('/blogs', blogRouter)

page.listen(process.env.PORT || 3000)