import {createSlice} from '@reduxjs/toolkit';

const employeeSlice = createSlice({
    name: "employees",
    initialState:[
        /*{_id: 1, Name: "Gabriela", Adress: "Decebal 29"},
        {_id: 2, Name: "Marcela", Adress: "Ghiocei 9"},
        {_id: 3, name: "Mirela", Adress: "Narciselor 99"}*/
    ],
    reducers: {
        // action
        addEmp: (state, action) => {
            const newEmp = {
                _id: Date.now(),
                name: action.payload.Name,
                adress : action.payload.Adress
            };
            state.push(newEmp);
        }
    }
});

export const {addEmp} = employeeSlice.actions;

export default employeeSlice.reducer;