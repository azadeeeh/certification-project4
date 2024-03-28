import { configureStore } from '@reduxjs/toolkit'
import taskMngReducer from "../feature/TaskMngSlice"

export const store = configureStore({
    reducer: {
        taskMng: taskMngReducer
    }
})