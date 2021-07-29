const navReducer = (state='emp', action) => {
    switch(action.type){
        case 'SHOWEMPLOYEES':
            return state='emp';
        case 'SHOWPROJECTS':
            return state='proj';
        default:
            return state; 
    }
};

export default navReducer;