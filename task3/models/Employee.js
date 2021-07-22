const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    Name : {
        type : String,
        required : true
    },
    Adress : {
        type : String,
        required : true
    },
    Email : {
        type : String,
        required : true
    },
    Hire_Date : {
        type : Date,
        required : true
        //default : Date.now
    },
    Salary : {
        type : Number,
        required : true
    },
    Job_Title : {
        type : String,
        required : true
    },
    Project_Id : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }
})

module.exports = mongoose.model('Employees', EmployeeSchema);