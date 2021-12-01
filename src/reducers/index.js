import counterReducer from "./counter";
import loggedReducer from "./isLogged";
import saveNewRegistration from "./registration";
import userData from "./userData";
import viewUserData from "./viewUserData";
import reuseData from "./reuseData";
import currentLocation from "./currentLocation";
import {combineReducers} from "redux";



const allReducers = combineReducers({counterReducer,loggedReducer,saveNewRegistration,userData,reuseData,viewUserData,currentLocation});

export default allReducers;