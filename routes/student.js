
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
//cREATE
router.post('/',async (req, res) => {
const single = new Student(req.body);
try {
let saved = await single.save();
res.status(200).json('Student Has Been Added');
} catch (error) {
res.status(500).json(error);
}
});
//Update
router.put('/:id',
async (req, res) => {
try {
const updateStudent = await Student.findByIdAndUpdate(
req.params.id,
{ $set: req.body },
{ new: true }
);
res.status(200).json('Student Has Been Updated');
} catch (error) {
res.status(500).json(error);
}
});
//Get Some
router.get('/', async (req, res) => {
try {
const result = await Student.find({ ...req.query });
res.status(200).json(result);
} catch (error) {
res.status(500).json(error);
}
});
//Get All
router.get('/', async (req, res) => {
try {
const result = await Student.find();
res.status(200).json(result);
} catch (error) {
res.status(500).json(error);
}
});
//Get one
router.get('/:id', async (req, res) => {
try {
const result = await Student.findById(req.params.id);
res.status(200).json(result);
} catch (error) {
res.status(500).json(error);
}
});
//delete
router.delete('/:id', async (req, res) => {
try {
await Student.findByIdAndDelete(req.params.id);
res.status(200).json('Student Has Been Deleted');
} catch (error) {
res.status(500).json(error);
}
});
module.exports = router;