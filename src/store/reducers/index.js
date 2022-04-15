import {combineReducers} from "redux";
import banksReducer from "./banks-reducer";


const rootReducer = combineReducers({
    banks: banksReducer
})

export default rootReducer
