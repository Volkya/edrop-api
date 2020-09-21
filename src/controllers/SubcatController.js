const Subcategory = require('../models/SubCategory');
const Category = require('../models/Category');

async function create(req, res, next){
    try{
        const subCat = new Subcategory({
            name: req.body.name,
            public_name: req.body.public_name
        });
        await subCat.save();
    }catch(e){
        console.log(e);
    }
}





function del() {

}

function edit() {

}


function view(){

}

function list(req, res){
    Subcategory.find({})
        .then(docs=>{
            res.json(docs);
        }).catch(err=>{
        console.log(err);
        res.json(err);
    })
}

async function crearSubCat(req, res) {
    // crear subcategoria para la categoria
    const subCat = new Subcategory(req.body);
    console.log(subCat);
    // buscar la categoria para asignar la subcategoria
    const cat = await Category.findById(req.params.id);
    console.log(cat);
    // // asignar a la categoria como dueña de la subcategoria
    Subcategory.cat = cat;
    // // // guardar subcategoria para la categoria
    await subCat.save();
    // // // asignar la subcategoria dentro del array de subcategorias de la categoria
    cat.sub_cats.push(subCat);
    // // // guardar el cat con su subcat nuevo
    await cat.save();
    // // // enviar a la category la subcategory
    res.send(subCat);
}

// async function subcatCat(req, res){
//     // buscar user
//     // const cat = await Category.findById(req.params.id);
//     const cat = await Category.findById(req.params.id).populate('sub_cats');
//     console.log(cat)
//     res.send(cat);
// }







module.exports = {
    create,
    del,
    edit,
    view,
    list,
    crearSubCat,
    // subcatCat
};
