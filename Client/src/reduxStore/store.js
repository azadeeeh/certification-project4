import { configureStore } from '@reduxjs/toolkit'
import taskMngReducer from "../feature/TaskMngSlice"
//creating Redux store
export const store = configureStore({
    reducer: {
        taskMng: taskMngReducer
    }
})