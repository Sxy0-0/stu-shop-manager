import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "antd/dist/antd.css";
import { HashRouter as Router,Switch, Route} from 'react-router-dom'
import {mainRoutes} from './routes'
import * as serviceWorker from './serviceWorker';
import App from './App';

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/admin" render={routeProps => <App {...routeProps} />} />
            {mainRoutes.map(route => {
                // return <Route key={route.path} path={route.path} component={route.component}/>
                return <Route key={route.path} {...route}/>
            })}
        </Switch>
</Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

