import {axios} from '../api/axios';
import React, {useState, useEffect} from "react";
import { useSelector } from 'react-redux';

const EmployeeList = () => {
    const [employees, setEmployees] = useState();

    const getEmployees = async () => {
        const resp = await axios.get("/employees").catch((err) => console.log("Error:", err)); 
        if(resp)
            setEmployees(resp.data);
    };
};

export default employees;

