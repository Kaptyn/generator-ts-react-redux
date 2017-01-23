import { createStore, applyMiddleware } from 'redux'
import { reducers, IApp } from './reducers';

// The Redux store can be loaded, or "hydrated" with an initial state. 
// This state could be loaded from the server, localStorage or another mechanism

export const INITIAL_STATE = {
        title: "My Tasks",
        tasks: [
            {
                title: "Build <%= title %>",
                completed: false,
                due: new Date("2017/03/01"),
                id: 1
            },
            {
                title: "Test <%= title %>",
                completed: false,
                due: new Date("2017/04/01"),
                id: 2

            },
            {
                title: "Deploy <%= title %>",
                completed: false,
                due: new Date("2017/05/01"),
                id: 3

            },
            {
                title: "Sell <%= title %>",
                completed: false,
                due: new Date("2017/06/01"),
                id: 4
            }
        ]
}

const state = {
    tasks: INITIAL_STATE
}


// Middleware is run after an action is called, but before the store is updated. This is just an example, and should not be run in production.
const logger = store => next => action => {
    console.log('dispatching ' + action.type + " with " , action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
}

export const store = createStore(reducers, state, applyMiddleware(logger));
