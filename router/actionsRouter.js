const express =require('express')
const actions = express.Router();

const actionsDB = require('../data/helpers/actionModel')


actions.get('/', (req,res)=>{
   actionsDB.get()
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.json({message: 'could not get acitons'})
    })
})

// get by id

actions.get('/:id', (req,res)=> {
    const id = req.params.id
    actionsDB.get(id)
    .then(item => {
        res.status(200).json(item)
    })
    .catch(err => {
        res.status(404).json({message:'action with that id not found'})
    })
})

// Post on ACTIONS
actions.post('/:id', (req,res)=> {
    const id = req.params.id
    const body = req.body
    actionsDB.insert(body)
        .then(item => {
            res.json(item)
        })
        .catch(err => {
            res.json({message: 'look at actions post'})
        })
})


// EDIT on ACTIONS
actions.put("/:id", actionsVal, (req,res)=> {
    const edit = req.body
    const id = req.params.id

    actionsDB.update(id, edit)
        .then(item => {
            res.json(item)
        })
        .catch(err => {
            res.json({message: 'need to look at put'})
        })
})

// delete actions

actions.delete("/:id", (req,res)=> {
    const id = req.params.id

    actionsDB.remove(id)
        .then(item => {
            res.json(item)
        })
        .catch(err => {
            res.json({message: 'did not delete actions'})
        })
})


function actionsVal(req,res,next) {

    const body = req.body
    if(!Object.keys(body).length){
        res.status(400).json({message: 'missing actions data'})
    }else if(!body.notes || !body.description || !body.project_id || !body.completed){
        res.status(400).json({message: 'missing text field'})
    }else{
    
    next();
    }
}




module.exports =actions;