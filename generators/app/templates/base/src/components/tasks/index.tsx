import * as React from 'react';
import { connect } from 'react-redux';
import { store } from '../../components';

// An interface defining the structure of a task
export interface ITask {
    title: string;
    completed: boolean;
    due: Date;
    id?: number;

    onTaskStatusChange?: (id: number) => void;
    onTaskCreation?: (taskName: string, dueDate: Date) => void;
    onTaskDeletion?: (id: number) => void
}

// An interface defining the structure of a task list
interface ITasks {
    title: string;
    tasks: ITask[];

    onTaskStatusChange?: (id: number) => void;
    onTaskCreation?: (taskName: string, dueDate: Date) => void;
    onTaskDeletion?: (id: number) => void
}

// The main task list component
export class TaskList extends React.Component<ITasks, any> {

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <table>
                    <tbody>
                        <tr>
                            <th></th>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Due Date</th>
                            <th></th>
                        </tr>
                        {
                            this.props.tasks.map((task: ITask, index: number) => {
                                return <Task {...task} onTaskStatusChange={this.props.onTaskStatusChange} onTaskDeletion={this.props.onTaskDeletion} key={task.id} />
                            })
                        }
                    </tbody>
                    <tfoot>
                        <TaskCreationForm title="" due={new Date()} onTaskCreation={this.props.onTaskCreation} completed={false} />
                    </tfoot>
                </table>

            </div>
        )
    }
}

// The component which contains functionality for adding a new task to the state
export class TaskCreationForm extends React.Component<ITask, any>{

    constructor(props) {
        super();

        this.state = {
            title: props.title,
            due: props.due
        }
    }

    render() {
        return (
            <tr>
                <td></td>
                <td></td>
                <td><input type="text" value={this.state.title} onChange={this.handleTitleChange} /></td>
                <td><input type="date" value={this.state.due.toISOString().split("T")[0]} onChange={this.handleDateChange} /></td>
                <td><button onClick={this.onClick}>Add</button></td>
            </tr>
        );
    }

    handleTitleChange = (event) => {
        this.setState({
            title: event.target.value
        });
    }

    handleDateChange = (event) => {
        this.setState({
            due: new Date(event.target.value)
        });
    }

    onClick = () => {
        this.props.onTaskCreation(this.state.title, this.state.due);
        this.setState({
            title: "",
            due: new Date()
        })
    }
}

// An individual task row component
export class Task extends React.Component<ITask, any> {
    render() {
        return (
            <tr>
                <td>
                    {
                        this.props.completed ?
                            <input type="checkbox" checked onChange={this.onChange} value={1} /> :
                            <input type="checkbox" onChange={this.onChange} value={0} />
                    }
                </td>
                <td>
                    <Strike {...this.props}>
                        {this.props.id}
                    </Strike>
                </td>
                <td>
                    <Strike {...this.props}>
                        {this.props.title}
                    </Strike>
                </td>
                <td>
                    <Strike {...this.props}>
                        {new Date(this.props.due).toLocaleDateString()}
                    </Strike>
                </td>
                <td>
                    <button onClick={() => { this.props.onTaskDeletion(this.props.id) } }>Delete</button>
                </td>
            </tr>
        )
    }

    onChange = () => {
        this.props.onTaskStatusChange(this.props.id);
    }
}

// A simple wrapper which adds a strikethrough class
class Strike extends React.Component<any, any>{
    render() {
        return <span className={this.props.completed ? "completed" : "inprogress"}>{this.props.children}</span>
    }
}


// This takes the state, as is in the store, and transforms it into a format that will be consumed by the components.
// In this example, everything but the "tasks" property is removed from the state locally
function mapStateToProps(state) {
    return {
        tasks: state.tasks.tasks,
        title: state.tasks.title
    }
}


// This container links the TaskList to the Redux store. It allows the main components to be stateless, as well as strongly typed.
// Events which deal with updating state are passed down from the container, to any component which whishes to evaluate it.
class taskListContainer extends React.Component<any, any>{
    render() {
        return (
            <TaskList {...this.props} onTaskCreation={this.onTaskCreation} onTaskStatusChange={this.onTaskStatusChange} onTaskDeletion={this.onTaskDeletion} />
        );
    }

    onTaskStatusChange = (id: number) => {
        store.dispatch({
            type: "TOGGLE_STATUS",
            data: {
                id: id,
            }
        })
    }

    onTaskCreation = (title, dueDate) => {
        store.dispatch({
            type: "ADD_TASK",
            data: {
                title: title,
                completed: false,
                due: new Date()
            }
        });
    }

    onTaskDeletion = (id) => {
        store.dispatch({
            type: "REMOVE_TASK",
            data: {
                id: id
            }
        })
    }
}

// The TaskListContainer is exported, connected to the store. This is used elsewhere to render a TaskList.
export let TaskListContainer = connect(mapStateToProps)(taskListContainer)