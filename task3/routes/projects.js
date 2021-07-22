const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// create -> post
router.post('/', async (req,res) => {
    //res.send('projects in post!');
    //console.log(req.body);
    const project = new Project({
        Project_name: req.body.Project_name,
        Start_date: req.body.Start_date,
        Planned_end_date: req.body.Planned_end_date,
        Description: req.body.Description,
        Project_code: req.body.Project_code
    });
    try{
        const savedProject = await project.save();
        res.json(savedProject); 
    } catch(err){
        res.json({message: err});
    }
    
});

// index -> get
router.get('/', async (req,res) => {
    //res.send('projects in get!');
    try{
        const projects = await Project.find();
        res.json(projects);
    }catch(err){
        res.json({message:err});
    }
});

// delete
router.delete('/:Id', async (req,res) => {
    try{
        const deletedProject = await Project.findOneAndDelete({_id: req.params.Id});
        res.json(deletedProject);
    } catch(err){
        res.json({message:err});
    }
});

// update -> put
router.put('/:Id', async (req,res) => {
    try{
        const updatedProject = await Project.updateOne(
            {_id: req.params.Id},
            {$set: {
                Project_name: req.body.Project_name,
                Start_date: req.body.Start_date,
                Planned_end_date: req.body.Planned_end_date,
                Description: req.body.Description,
                Project_code: req.body.Project_code
            }}
        );
        res.json(updatedProject);
    } catch(err){
        res.json({message:err});
    }
});

module.exports = router;