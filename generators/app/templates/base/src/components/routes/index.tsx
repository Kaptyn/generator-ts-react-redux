import * as React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { HelloWorld, TaskListContainer, store } from '../../components';

// This hooks up all of the components with the routing and store. The store is passed down through the router, the route and eventually to the components.
// The syntax of the Route does not normally allow parameters to be passed in, hence the extra anonymous function for the HelloWorld component. This should generally be avoided in favour of a "container" component

export var routes = 
<Provider store={store}>
        <Router history={browserHistory}>
                <Route path="/" component={ () => <HelloWorld name="<%= title %>" time={new Date().toTimeString()} />  } />
                <Route path="/tasks" component={TaskListContainer} />
        </Router>
</Provider>