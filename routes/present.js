




const express = require('express');
const router = express.Router();
const Present = require('../models/Present');


//cREATE
router.post('/',async (req, res) => {

try {
  
let saved = await Present.insertMany(req.body);
res.status(200).json('Present Has Been Added');
} catch (error) {
res.status(500).json(error);
}
});
//Update
router.put('/:id',
async (req, res) => {
try {
const updatePresent = await Present.findByIdAndUpdate(
req.params.id,
{ $set: req.body },
{ new: true }
);
res.status(200).json('Present Has Been Updated');
} catch (error) {
res.status(500).json(error);
}
});
//Get Some
router.get('/', async (req, res) => {
try {
    // await Present.deleteMany({})
const result = await Present.find({ ...req.query });
res.status(200).json(result);
} catch (error) {
res.status(500).json(error);
}
});
router.get('/check', async (req, res) => {
try {
const result = await Present.find({ ...req.query });
if (result[0].date == new Date().toDateString()) {
    res.status(200).json({isPresented:true});
    
}
else{
    res.status(200).json({isPresented:false});

}

} catch (error) {
res.status(500).json({isPresented:false});
console.log(error)
}
});
//Get All
router.get('/', async (req, res) => {
try {
const result = await Present.find();
res.status(200).json(result);
} catch (error) {
res.status(500).json(error);
}
});
//Get one
router.get('/:id', async (req, res) => {
try {
const result = await Present.findById(req.params.id);
res.status(200).json(result);
} catch (error) {
res.status(500).json(error);
}
});
//delete
router.delete('/', async (req, res) => {
try {
await Present.deleteMany({_id:{ $in : req.body}});
res.status(200).json('Present Has Been Deleted');
} catch (error) {
res.status(500).json(error);
}
});
module.exports = router;