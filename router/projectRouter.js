const express =require('express')
const router = express.Router();


const actionsDB = require('../data/helpers/actionModel')
const projectsDB = require('../data/helpers/projectModel')

//get 
router.get("/", (req,res)=> {
    projectsDB.get()
    .then(items => {
        res.json(items)
    })
    .catch(err => {
        res.status(500).json({message: 'something went wrong with the project get'})
    })
})

// get by id
router.get('/:id', (req,res)=> {
    const id = req.params.id
    projectsDB.get(id)
    .then(item => {
        if(!item.id){
            res.status(404).json({error: 'this project is not found'})
        }else{
            res.json(item)
        }
    })
    .catch(err => {
        res.status(500).json({message:"project with id not found"})
    })
})


// post  PROJECTS
router.post('/', (req,res)=> {
    const body = req.body

    projectsDB.insert(body)
        .then(item => {
            if(!body.name || !body.description){
                res.status(404).json({error: "fill out all requried fields"})
            }else {
                res.status(200).json(item)
            }
        })
        .catch(err => {
            res.json({message: 'need to look at post'})
        })
})



//edit by id PROJECTS
router.put("/:id", (req,res)=> {
    const id = req.params.id
    const edit = req.body

    if(!edit.name || !edit.description){
        res.status(400).json({error: "please provide name and desc"})
    }else{
        projectsDB.update(id, edit)
            .then(item => {
                res.json(item)
            })
            .catch(err => {
                res.json({message: 'need to look at put'})
            })
    }
})


//delete by id PROJECTS
router.delete("/:id",(req,res)=> {
    const id = req.params.id
    projectsDB.remove(id)
        .then(item => {
            res.json(item)
        })
        .catch(err => {
            res.json({message: 'item was not removed'})
        })

})






module.exports =router;