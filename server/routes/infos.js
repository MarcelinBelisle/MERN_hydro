const express = require('express')
const info = require('../models/info')
const router = express.Router()
const Info = require('../models/info')


//Getting all
router.get('/', async (req, res) =>{
    try{
        const infos = await Info.find()
        res.json(infos)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
//Getting one
router.get('/:id', getInfo, (req, res) =>{
    res.json(res.info)
})
//Creating one
router.post('/', async (req, res) =>{
    const info = new Info({
        name: req.body.name,
        color: req.body.color
    })
    try{
        const newInfo = await info.save()
        res.status(201).json(newInfo)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
//Updating one
router.patch('/:id', getInfo, async (req, res) =>{
    if(req.body.name != null) {
        res.info.name = req.body.name
    }
    if(req.body.color != null) {
        res.info.color = req.body.color
    }
    try{
       const updatedInfo = await res.info.save()
       res.json(updatedInfo)
   } catch (err) {
    res.status(400).json({ message: err.message })
   }
})
//Deleting one
router.delete('/:id', getInfo, async (req, res) =>{
    try{
         await res.info.remove()
         res.json({ message: 'Deleted info' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getInfo(req, res, next) {
    let info
    try{
        info = await Info.findById(req.params.id)
        if (info == null) {
            return res.status(404).json({message: 'Cannot find info' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

    res.info = info
    next()
}



module.exports = router