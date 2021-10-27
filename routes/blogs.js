const express = require('express')
const router = express.Router()
const Article = require('./../models/article')

router.use(express.static("styles"))

router.get('/new',(req,res)=>{
    res.render('articles/new', {article: new Article() })
})

router.get('/edit/:id', async (req,res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', {article: article })
})

router.get('/:slug', async (req,res)=>{
    const article = await Article.findOne({ slug: req.params.slug })
    if(article == null) res.redirect('/')
    res.render('articles/show',{article:article})
})

router.post('/',async (req,res,next)=>{
    req.article = new Article()
    next()
}, editArticle('new'))

router.put('/:id',async (req,res,next)=>{
    req.article = await Article.findById(req.params.id)
    next()
}, editArticle('edit'))

router.delete('/:id', async (req, res)=>{
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

function editArticle(path){
    return async (req,res)=>{
        let article = req.article
        article.title =  req.body.title
        article.name =  req.body.name
        article.description =  req.body.description
        article.markdown =  req.body.markdown
        try{
            article = await article.save()
            res.redirect(`/blogs/${article.slug}`)
        }catch(e){
            res.render(`blogs/${path}`,{article:article})
        }
        
    }
}

module.exports = router 