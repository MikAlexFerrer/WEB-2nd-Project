const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const domPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const purify = domPurify(new JSDOM().window)


const articleScheme = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    markdown:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now 
    },
    slug:{
        type: String,
        required: true,
        unique: true
    },
    cleanHtml:{
        type: String,
        required: true,
    }
})

articleScheme.pre('validate', function(next){
    if(this.title){
        this.slug = slugify(this.title, {lower: true, strict: true})
    }
    if(this.markdown){
        this.cleanHtml = purify.sanitize(marked(this.markdown))
    }
    next()
})

module.exports = mongoose.model('Article', articleScheme)