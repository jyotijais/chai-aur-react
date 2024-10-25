import {configureStore} from '@reduxjs/toolkit';
import todoReducer from '../features/todo/todoSlice';


//console.log(store); // This should output the store with a valid getState method

export const store = configureStore({
    reducer: todoReducer
})


