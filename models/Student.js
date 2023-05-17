


const mongoose = require('mongoose');
const StudentSchema = new mongoose.Schema(
{
name: {
type: String,
 require: true,
},
className: {
type: String,
 require: true,
},
group: {
type: String,
 require: true,
},
roll: {
type: String,
 require: true,
},
phone: {
type: String,
 require: true,
},
address: {
type: String,
 require: true,
},
},
{ timestamps: true }
);
module.exports = mongoose.model('Student',StudentSchema);