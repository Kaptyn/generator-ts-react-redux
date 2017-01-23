import { combineReducers } from 'redux';
import { taskReducer, IApp } from './task-reducer'
export { IApp } from './task-reducer';


// An application can have multiple reducers. Reducers can be combined for use in a single store.
export var reducers = combineReducers({
    tasks : taskReducer
});