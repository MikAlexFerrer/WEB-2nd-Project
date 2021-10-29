const { application } = require('express')
const express = require('express')
const blogRouter = require('./routes/blogs')
const page = express()
const mongoose = require('mongoose')
const Article = require('./models/article')
const methodOverride = require('method-override')

require('dotenv').config({ path: 'variables.env' })

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

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3000

page.set("port", PORT)

page.listen(PORT, HOST, () => {
    console.log('SIUUUUU')
})