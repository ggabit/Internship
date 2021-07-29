import React, {useState, useEffect} from "react";
import { DataGrid } from '@material-ui/data-grid';
import { Typography, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import {Delete,Edit} from '@material-ui/icons';
import {axios} from '../api/axios';
import { useDispatch, useSelector } from 'react-redux';
import { format } from "date-fns";
import { addEmp } from "../redux/employeeSlice";



//const fetchURL = "http://localhost:3001/employees";
//const getEmployees = () => fetch(fetchURL).then(res => res.json());

const Employees = () => {
    const dispatch = useDispatch();
    let emps = useSelector((state)=> state.employees);
    const [employees, setEmployees] = useState();
    const [formEmp, setFormEmp] = useState({});
    const [select, setSelection] = React.useState({});
    const [updateData, setUpdateData] = useState({});

    useEffect(() => {
        getEmployees();
        //getStateEmp();
    }, []);

const getStateEmp = async () => {
    setEmployees(emps);
}

const getEmployees = async () => {
    const resp = await axios.get("/employees").catch((err) => console.log("Error:", err)); 
    if(resp){
        resp.data.forEach((item, i) => {
            item.index = i + 1;
            item.Hire_Date = format(new Date(item.Hire_Date), "yyyy-MM-dd");
          });
        setEmployees(resp.data);
    }
        
}

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
    { field: '_id', headerName: 'Id', width: 150, hide: true},
    { field: 'index', headerName: '#', width: 90},
    {
      field: 'Name',headerName: 'Name',width: 150,editable: true
    },
    {
      field: 'Adress',headerName: 'Adress',width: 130,editable: true
    },
    {
        field: 'Email',headerName: 'Email',width: 200,editable: true
    },
    {
        field: 'Salary',headerName: 'Salary',width: 120,editable: true
    },
    {
        field: 'Job_Title',headerName: 'Job Title',width: 150,editable: true
    },
    {
        field: 'Hire_Date',headerName: 'Hire Date',width: 140,editable: true
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
        setFormEmp({...formEmp, [e.target.id]: e.target.value});
        //console.log(formEmp);
    };

    const handleChangeU = (e) => {
        setFormEmp({...select, [e.target.id]: e.target.value});
        setSelection({...select, [e.target.id]: e.target.value});
        //console.log(formEmp);
      };

    // create emp
    const addEmployee = async (e) => {
        console.log(formEmp);
        const response = await axios.post("/employees", formEmp).catch((err) => {console.log("Error:",err);});
        if(response)
            dispatch(
                addEmp(formEmp)
            );
        e.preventDefault();
        return false;
    };

    const handleClickDelete = (e) => {
        //console.log(updateData); 
        setOpenD(true);
      }

    // delete emp
    const deleteEmployee = async (id) => {
        const resp = await axios.delete(`/employees/${id}`).catch((err) => console.log("Error: ", err)); 
        if(resp)
        getEmployees();
    };

    const [openD, setOpenD] = React.useState(false);

    const handleClickOpenD = () => {
        setOpenD(true);
    };

    const handleCloseD = () => {
        setOpenD(false);
    };

    // last clicked -> get the id from here
    const handleLastClicked = (e) => {
        const s = {};
        var hDate = new Date(e.row.Hire_Date);

        s["_id"] = e.row._id;
        s["Name"] = e.row.Name;
        s["Adress"] = e.row.Adress;
        s["Email"] = e.row.Email;
        s["Salary"] = e.row.Salary;
        s["Job_Title"] = e.row.Job_Title;
        s["Hire_Date"] = format(hDate, "yyyy-MM-dd");
        setSelection(s); 
    }
    React.useEffect(() => {
      //console.log(select);
    }, [select]);
    
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setFormEmp({...formEmp, Hire_Date: new Date().toISOString().substr(0,10)});
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickUpdate = (e) => {
        //console.log(updateData); 
        setOpenU(true);
      }
      React.useEffect(() => {
        //console.log(select);
      }, [updateData]);
  
      // update emp
      const updateEmployee = async (id) => {
        const resp = await axios.put(`/employees/${id}`, formEmp).catch((err) => console.log("Error: ", err)); 
        if(resp)
          getEmployees();
      };

    const [openU, setOpenU] = React.useState(false);

    const handleClickOpenU = () => {
        setOpenU(true);
    };

    const handleCloseU = () => {
        setOpenU(false);
    };

    //onClick={ () => dispatch(addEmployee(employees))}
    if (employees) {
        return (
            <div style={{ height: 400, width: '100%' }}>
                <br></br>
                <Typography variant="h4" id="tableTitle" component="div">
                     List of Employees
                </Typography>
                <br></br>
                <DataGrid
                    rows={employees}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    disableSelectionOnClick
                    getRowId={(row) => row._id}
                    onCellClick={handleLastClicked}
                    onDelete={deleteEmployee}
                />

                <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    New Employee
                </Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">New Employee</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Fill in the information.
                    </DialogContentText>
                    <form onSubmit={(e) => addEmployee(e)}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Name"
                        label="Name"
                        type="text"
                        fullWidth
                        required
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        id="Adress"
                        label="Adress"
                        type="text"
                        fullWidth
                        required
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        id="Email"
                        label="Email"
                        type="email"
                        fullWidth
                        required
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        id="Salary"
                        label="Salary"
                        type="number"
                        fullWidth
                        required
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        id="Job_Title"
                        label="Job Title"
                        type="text"
                        fullWidth
                        required
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        id="Hire_Date"
                        label={"Hire Date"}
                        type="date"
                        fullWidth
                        required
                        onChange={handleChange}
                        defaultValue={new Date().toISOString().substr(0,10)}
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
                    <DialogTitle id="form-dialog-title">Update Employee</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Update the information.
                    </DialogContentText>
                    <form onSubmit={() => updateEmployee(select["_id"])}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Name"
                        label="Name"
                        type="text"
                        fullWidth
                        required
                        onChange={handleChangeU}
                        value={select["Name"]}
                    />
                    <TextField
                        margin="dense"
                        id="Adress"
                        label="Adress"
                        type="text"
                        fullWidth
                        required
                        onChange={handleChangeU}
                        value={select["Adress"]}
                    />
                    <TextField
                        margin="dense"
                        id="Email"
                        label="Email"
                        type="email"
                        fullWidth
                        required
                        onChange={handleChangeU}
                        value={select["Email"]}
                    />
                    <TextField
                        margin="dense"
                        id="Salary"
                        label="Salary"
                        type="number"
                        fullWidth
                        required
                        onChange={handleChangeU}
                        value={select["Salary"]}
                    />
                    <TextField
                        margin="dense"
                        id="Job_Title"
                        label="Job Title"
                        type="text"
                        fullWidth
                        required
                        onChange={handleChangeU}
                        value={select["Job_Title"]}
                    />
                    <TextField
                        margin="dense"
                        id="Hire_Date"
                        label={"Hire Date"}
                        type="date"
                        fullWidth
                        required
                        onChange={handleChangeU}
                        value={select["Hire_Date"]}
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
                    <DialogTitle id="form-dialog-title">Delete Employee</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this employee?
                    </DialogContentText>
                    <form onSubmit={() => deleteEmployee(select["_id"])}>
                    <TextField
                        margin="dense"
                        id="Name"
                        label="Name"
                        type="text"
                        fullWidth
                        inputProps={
                            { readOnly: true }}
                        value={select["Name"]}
                    />
                    <TextField
                        margin="dense"
                        id="Adress"
                        label="Adress"
                        type="text"
                        fullWidth
                        inputProps={
                            { readOnly: true }}
                        value={select["Adress"]}
                    />
                    <TextField
                        margin="dense"
                        id="Email"
                        label="Email"
                        type="email"
                        fullWidth
                        inputProps={
                            { readOnly: true }}
                        value={select["Email"]}
                    />
                    <TextField
                        margin="dense"
                        id="Salary"
                        label="Salary"
                        type="number"
                        fullWidth
                        inputProps={
                            { readOnly: true }}
                        value={select["Salary"]}
                    />
                    <TextField
                        margin="dense"
                        id="Job_Title"
                        label="Job Title"
                        type="text"
                        fullWidth
                        required
                        inputProps={
                            { readOnly: true }}
                        value={select["Job_Title"]}
                    />
                    <TextField
                        margin="dense"
                        id="Hire_Date"
                        label={"Hire Date"}
                        type="date"
                        fullWidth
                        required
                        inputProps={
                            { readOnly: true }}
                        value={select["Hire_Date"]}
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
    
    return <div>{employees}</div>;
}

export default Employees;