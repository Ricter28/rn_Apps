import { combineReducers } from "redux";
import userReducer from "./userReducer";
import modalReducer from "./modalReducer";
import screenReducer from "./screenReducer";




var AllReducer = {};
AllReducer["userReducer"] = userReducer;
AllReducer["modalReducer"] = modalReducer;
AllReducer["screenReducer"] = screenReducer;

// const rootReducer = combineReducers({
//     userReducer,
//     modalReducer,
//     screenReducer,
//   });


const rootReducer = combineReducers(AllReducer);
export default rootReducer;
