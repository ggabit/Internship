const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// create -> post
router.post('/', async (req,res) => {
    //res.send('employees in post!');
    //console.log(req.body);
    const employee = new Employee({
        Name: req.body.Name,
        Adress: req.body.Adress,
        Email: req.body.Email,
        Salary: req.body.Salary,
        Job_Title: req.body.Job_Title
    });
    try{
        const savedEmployee = await employee.save();
        res.json(savedEmployee); 
    } catch(err){
        res.json({message: err});
    }
    
});

// index -> get
router.get('/', async (req,res) => {
    //res.send('employees in get!');
    try{
        const employees = await Employee.find();
        res.json(employees);
    }catch(err){
        res.json({message:err});
    }
});

// get by Name
router.get('/:Name', async (req,res) =>{
    //console.log(req.params.Name);
    try{
    const employee = await Employee.find({ Name: req.params.Name});
    res.json(employee);
    }catch(err){
        res.json({message:err});
    }
});

// delete
router.delete('/:Id', async (req,res) => {
    try{
        const deletedEmployee = await Employee.remove({_id: req.params.Id});
        res.json(deletedEmployee);
    } catch(err){
        res.json({message:err});
    }
});

// update -> put
router.put('/:Id', async (req,res) => {
    try{
        const updatedEmployee = await Employee.updateOne(
            {_id: req.params.Id},
            {$set: {
                Name: req.body.Name,
                Adress: req.body.Adress,
                Email: req.body.Email,
                Salary: req.body.Salary,
                Hire_Date: req.body.Hire_Date,
                Job_Title: req.body.Job_Title
            }}
        );
        res.json(updatedEmployee);
    } catch(err){
        res.json({message:err});
    }
});

module.exports = router;