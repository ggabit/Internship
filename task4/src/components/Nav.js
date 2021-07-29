import React from 'react';
import { useDispatch } from 'react-redux';
import {AppBar, Typography, Button, Link} from '@material-ui/core';
import { showEmployees } from '../actions';
import { showProjects } from '../actions';

const Nav = () => {
    const dispatch = useDispatch();

    return(
        <AppBar position="static" color="primary"> 
            < Typography varaint="h2" align="center">
                <div align="center"> 
                    <h2>
                        <Link href="/" color="inherit" underline="none">This is my app </Link>
                        <Button href="/employees" color="inherit" onClick={() => dispatch(showEmployees())}>Employees</Button> 
                        <Button href="/projects" color="inherit" onClick={() => dispatch(showProjects())}>Projects</Button>
                    </h2>
                </div>
            </Typography>
        </AppBar>
    );
};

export default Nav;