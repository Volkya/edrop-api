const Category = require('../models/Category');


async function create(req, res, next){
    try{
        const category = new Category({
            name: req.body.name,
            public_name: req.body.public_name
        });
        const catSaved = await category.save();
        res.status(201).json(catSaved);
    }catch(e){
        console.log(e);
        return res.status(500).json(e);
    }
}

function del(req, res) {
    Category.findByIdAndRemove(req.params.id)
        .then(doc => {
            res.json(doc)
        }).catch(err=> {
            res.json(err);
    })
}


function view(req, res){
    Category.findById(req.params.id)
        .then(doc => {
            console.log(doc);
            res.json(doc);
        }).catch(err => {
            res.json(err);
    })
}

function list(req, res){
    Category.find({})
 .then(docs=>{
    res.json(docs);
}).catch(err=>{
    console.log(err);
    res.json(err);
})
}




async function getSubCats(req, res){
    // buscar user
    // const cat = await Category.findById(req.params.id);
    const cat = await Category.findById(req.params.id).populate('sub_cats');
    console.log(cat)
    res.send(cat);
}



module.exports = {
    create,
    del,
    view,
    list,
    getSubCats
};
