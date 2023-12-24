import { combineReducers } from "redux";
import ExampleReducer from "./example/example.reducers";

const rootReducer = combineReducers({
  example: ExampleReducer,
});

export default rootReducer;
