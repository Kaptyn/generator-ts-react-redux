import { ITask } from '../../../components';

export interface IApp {
    title?: string;
    tasks: ITask[];
}

// The reducer takes all incoming actions, triggered throughout the application, and processes them. The reducer is the only way the application state can be updated. 
export const taskReducer = (state: IApp, action) => {
    let stateClone = cloneObject(state);

    // Dependant on the type of action, additional code can be executed.
    switch (action.type) {
        case "ADD_TASK":
            return addTask(stateClone, action.data);
        case "REMOVE_TASK": 
            return removeTask(stateClone, action.data);
        case "TOGGLE_STATUS":
            return toggleStatus(stateClone, action.data);
        
        default:
            // The state should always be returned. If no change is made, return the original state
            return stateClone;
    }
}

//  Adds a new task to the state, assigning an incremented ID.
let addTask = (state: IApp, data) => {

     // Orders the task by ID in reverse, to find the last used ID
    function sortTasksById(a, b) : number {
        return +(a.id > b.id);
    }

    var stateOrdered = cloneObject(state);
    var tasks = stateOrdered.tasks.sort(sortTasksById).reverse();
    
    // Sets the ID of the task to the next available number
    data.id = tasks.length > 0 ? tasks[0].id + 1 : 1;

    let {title, id, due }: ITask = data;
   
    state.tasks.push({
        title: title,
        id: id,
        completed: false,
        due: due
    });

    return state;
}

let removeTask = (state: IApp, data) => {
    // Get only those tasks which do not match the current ID
    state.tasks = state.tasks.filter(x => x.id != data.id);
    return state;
}
 
// Sets the 'completed' field to its inverse value.
let toggleStatus = (state: IApp, data) => {
    let task = state.tasks.filter(x => x.id == data.id)[0];
    task.completed = !task.completed;
    return state;
}

// Performs a shallow clone of an object to prevent mutation of the original object.
const cloneObject = (object: any): IApp => {
    let clone = typeof object == "undefined" ? {} :  JSON.parse(JSON.stringify(object));
    return clone;
}