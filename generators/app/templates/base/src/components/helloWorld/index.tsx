import * as React from 'react';
import { Link } from 'react-router';

export class HelloWorld extends React.Component<any,any>{
    interval : any;

    render(){
        return (
        <div>
            <h1>Hello, <span>{this.props.name}</span>!</h1>
            <p>The time is, <span>{this.state.time}</span></p>
            
            <ul>
                <li><Link to="/tasks">Tasks Demo</Link></li>
            </ul>

        </div>
        )        
    }

    // This runs on the server side, as well as the client. The state, if used should be hydrated here.
    componentWillMount(){
        this.state = {
            time: this.props.time
        }
    }

    // This runs only on the client. Any client specific things, or long-running tasks should be here.
    componentDidMount(){
        this.interval = setInterval(() => {this.updateTime()}, 500);
    }

    // This runs when the component is remove from the page - for example when a navigation event occurs.
    componentWillUnmount(){
        clearInterval(this.interval);
    }

    updateTime(){
        this.setState({
            time: new Date().toLocaleTimeString()           
        })
    }
}