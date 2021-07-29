export const showEmployees = () =>{
    return{
        type: 'SHOWEMPLOYEES'
    };
};

export const showProjects = () =>{
    return{
        type: 'SHOWPROJECTS'
    };
};

export const addEmployee = (emp) =>{
    return{
        type: 'ADDEMPLOYEE',
        payload: emp
    };
};
