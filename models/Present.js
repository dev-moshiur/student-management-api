

const mongoose = require('mongoose');
const PresentSchema = new mongoose.Schema(
{
isPresent: {
type: Boolean,
 required: true,
 default:true,
},
studentId: {
type: String,
 required: true,

},
name: {
type: String,
 required: true,

},
date: {
type: String,
 required: true,

},
roll: {
type: String,
 required: true,

},
className: {
type: String,
 required: true,

},
group: {
type: String,
 required: true,

},
},
{ timestamps: true }
);
module.exports = mongoose.model('Present',PresentSchema);