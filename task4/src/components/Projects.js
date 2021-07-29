import React, {useState, useEffect} from "react";
import Project from './Project';
import { DataGrid, GridCellParams } from '@material-ui/data-grid';
import { Typography, Button, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import {TextField , Dialog, } from '@material-ui/core';
import {Delete,Edit} from '@material-ui/icons';
import { format } from "date-fns";
import {axios} from '../api/axios';

//const fetchURL = "http://localhost:3001/projects";
//const getProjects = () => fetch(fetchURL).then(res => res.json());

const Projects = () => {
    const [projects, setProjects] = useState();
    const [formProj, setFormProj] = useState({});
    const [select, setSelection] = React.useState([]);
    const [updateData, setUpdateData] = useState({});

    useEffect(() => {
        //getProjects().then(res => 
            //setProjects(res));
        getProjects();
    }, []);

    const getProjects = async () => {
        const resp = await axios.get("/projects").catch((err) => console.log("Error:", err)); 
        if(resp){
          resp.data.forEach((item, i) => {
            item.index = i + 1;
            item.Start_date = format(new Date(item.Start_date), "yyyy-MM-dd");
            item.Planned_end_date = format(new Date(item.Planned_end_date), "yyyy-MM-dd");
          });
          setProjects(resp.data);
        }
            
    }

    //console.log("Projects:", projects);
  
  // option buttons render
  const renderOptionButtons = (params) => {
    return (
      <div>
        <strong>
            <Button color="primary" size="small" style={{ marginLeft: 16 }}
            onClick={(e) => handleClickUpdate(e)}>
                  <Edit variant="contained" color="inherit">

                  </Edit>  
            </Button>
        </strong>
        <strong>
          <Button color="secondary" size="small" style={{ marginLeft: 16 }}
          onClick={(e) => handleClickDelete(e)}>
                <Delete variant="contained" color="inherit">

                </Delete>  
          </Button>
        </strong>
      </div>
    )
}
  
  const columns = [
      { field: '_id', headerName: 'Id', width: 250, hide: true},
      { field: 'index', headerName: '#', width: 90},
      {
        field: 'Project_name',headerName: 'Name',width: 150,editable: false
      },
      {
        field: 'Start_date',headerName: 'Start date',width: 150,editable: false, type:'date'
      },
      {
          field: 'Planned_end_date',headerName: 'Planned end date',width: 200,editable: false
      },
      {
          field: 'Description',headerName: 'Description',width: 200,editable: false
      },
      {
          field: 'Project_code',headerName: 'Code',width: 150,editable: false
      },
      {
        field: 'options',
        headerName: 'Options',
        width: 200,
        renderCell: renderOptionButtons,
        disableClickEventBubbling: true
    }
    ];

  const handleChange = (e) => {
    setFormProj({...formProj, [e.target.id]: e.target.value});
    //console.log(formProj);
  };

  const handleChangeU = (e) => {
    setFormProj({...select, [e.target.id]: e.target.value});
    setSelection({...select, [e.target.id]: e.target.value});
    //console.log(formProj);
  };

  // create project
  const addProject = async () => {
      console.log(formProj);
      const response = await axios.post("/projects", formProj).catch((err) => {console.log("Error:",err);});
      if(response)
          getProjects();
  };

  const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setFormProj({...formProj, Planned_end_date: new Date().toISOString().substr(0,10), Start_date: new Date().toISOString().substr(0,10)});
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickDelete = (e) => {
      //console.log(updateData); 
      setOpenD(true);
    }

    // delete project
    const deleteProject = async (id) => {
      const resp = await axios.delete(`/projects/${id}`).catch((err) => console.log("Error: ", err)); 
      if(resp)
        getProjects();
    };

    const [openD, setOpenD] = React.useState(false);

    const handleClickOpenD = () => {
        setOpenD(true);
    };

    const handleCloseD = () => {
        setOpenD(false);
    };

    const handleLastClicked = (e) => {
      const s = {};
      var sDate = new Date(e.row.Start_date);
      var eDate = new Date(e.row.Planned_end_date);

      s["_id"] = e.row._id;
      s["Project_name"] = e.row.Project_name;
      s["Start_date"] = format(sDate, "yyyy-MM-dd");
      s["Planned_end_date"] = format(eDate, "yyyy-MM-dd");
      s["Description"] = e.row.Description;
      s["Project_code"] = e.row.Project_code;
      setSelection(s);
      //setSelection(e.row._id);
      //console.log(s["Start_date"]); 
    }
    React.useEffect(() => {
      //console.log(select);
    }, [select]);

    const handleClickUpdate = (e) => {
      //console.log(updateData); 
      setOpenU(true);
    }
    React.useEffect(() => {
      //console.log(select);
    }, [updateData]);

    // update project
    const updateProject = async (id) => {
      const resp = await axios.put(`/projects/${id}`, formProj).catch((err) => console.log("Error: ", err)); 
      if(resp)
        getProjects();
    };

    const [openU, setOpenU] = React.useState(false);

    const handleClickOpenU = () => {
      setOpenU(true);
    };

    const handleCloseU = () => {
        setOpenU(false);
    };

    if (projects) {
        return (
            <div style={{ height: 400, width: '100%' }}>
                <br></br>
              <Typography variant="h4" id="tableTitle" component="div">
                List of Projects
              </Typography>
              <br></br>
              <DataGrid
                rows={projects}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableSelectionOnClick
                getRowId={(row) => row._id}
                onCellClick={handleLastClicked}
                onDelete={deleteProject}
              />
              <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    New Project
                </Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">New Project</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Fill in the information.
                    </DialogContentText>
                    <form onSubmit={addProject}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Project_name"
                        label="Name"
                        type="text"
                        fullWidth
                        required
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        id="Start_date"
                        label="Start date"
                        type="date"
                        fullWidth
                        required
                        onChange={handleChange}
                        defaultValue={new Date().toISOString().substr(0,10)}
                    />
                    <TextField
                        margin="dense"
                        id="Planned_end_date"
                        label="Planned end date"
                        type="date"
                        fullWidth
                        required
                        onChange={handleChange}
                        defaultValue={new Date().toISOString().substr(0,10)}
                    />
                    <TextField
                        margin="dense"
                        id="Description"
                        label="Description"
                        type="text"
                        fullWidth
                        required
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        id="Project_code"
                        label="Project code"
                        type="text"
                        fullWidth
                        required
                        onChange={handleChange}
                    />
                    
                    <DialogActions>
                    <Button color="primary" type="submit">
                        Add
                    </Button>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    </DialogActions>
                    </form>
                    </DialogContent>
                </Dialog>

                <Dialog open={openU} onClose={handleCloseU} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Update Project</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Update in the information.
                    </DialogContentText>
                    <form onSubmit={() => updateProject(select["_id"])}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Project_name"
                        label="Name"
                        type="text"
                        fullWidth
                        required
                        onChange={handleChangeU}
                        value={select["Project_name"]}
                    />
                    <TextField
                        margin="dense"
                        id="Start_date"
                        label="Start date"
                        type="date"
                        fullWidth
                        required
                        onChange={handleChangeU}
                        value={select["Start_date"]}
                    />
                    <TextField
                        margin="dense"
                        id="Planned_end_date"
                        label="Planned end date"
                        type="date"
                        fullWidth
                        required
                        onChange={handleChangeU}
                        value={select["Planned_end_date"]}
                    />
                    <TextField
                        margin="dense"
                        id="Description"
                        label="Description"
                        type="text"
                        fullWidth
                        required
                        onChange={handleChangeU}
                        value={select["Description"]}
                    />
                    <TextField
                        margin="dense"
                        id="Project_code"
                        label="Project code"
                        type="text"
                        fullWidth
                        required
                        required
                        onChange={handleChangeU}
                        value={select["Project_code"]}
                    />
                    
                    <DialogActions>
                    <Button color="primary" type="submit">
                        Save
                    </Button>
                    <Button onClick={handleCloseU} color="secondary">
                        Cancel
                    </Button>
                    </DialogActions>
                    </form>
                    </DialogContent>
                </Dialog>

                <Dialog open={openD} onClose={handleCloseD} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Delete Project</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this project?
                    </DialogContentText>
                    <form onSubmit={() => deleteProject(select["_id"])}>
                    <TextField
                        margin="dense"
                        id="Project_name"
                        label="Name"
                        type="text"
                        fullWidth
                        inputProps={
                          { readOnly: true }}
                        value={select["Project_name"]}
                    />
                    <TextField
                        margin="dense"
                        id="Start_date"
                        label="Start date"
                        type="date"
                        fullWidth
                        inputProps={
                          { readOnly: true }}
                        value={select["Start_date"]}
                    />
                    <TextField
                        margin="dense"
                        id="Planned_end_date"
                        label="Planned end date"
                        type="date"
                        fullWidth
                        inputProps={
                          { readOnly: true }}
                        value={select["Planned_end_date"]}
                    />
                    <TextField
                        margin="dense"
                        id="Description"
                        label="Description"
                        type="text"
                        fullWidth
                        inputProps={
                          { readOnly: true }}
                        value={select["Description"]}
                    />
                    <TextField
                        margin="dense"
                        id="Project_code"
                        label="Project code"
                        type="text"
                        fullWidth
                        required
                        inputProps={
                          { readOnly: true }}
                        value={select["Project_code"]}
                    />
                    
                    <DialogActions>
                    <Button color="secondary" type="submit">
                        Delete
                    </Button>
                    <Button onClick={handleCloseD} color="primary">
                        Cancel
                    </Button>
                    </DialogActions>
                    </form>
                    </DialogContent>
                </Dialog>
            </div>
          );
    }

    return <div>{projects}</div>;
}

export default Projects;