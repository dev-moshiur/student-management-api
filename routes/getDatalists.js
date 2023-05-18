


const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
// const CurrentStaff = require('../models/CurrentStaff');



//Get All
router.get('/', async (req, res) => {
try {
// const teachers = await CurrentTeacher.count();
const groups = await Student.distinct('group');
// const govtStaffs = await CurrentStaff.count({depertment:'সরকারি'}) || await CurrentStaff.count({depertment:'সরকারি '});
// const nonGovtStaffs = await CurrentStaff.count({depertment:'বেসরকারি'}) || await CurrentStaff.count({depertment:'বেসরকারি '});


res.status(200).json({groups});
} catch (error) {
res.status(500).json(error);
}
});

module.exports = router;