import React, {Component} from 'react';
import './App.css';
import "antd/dist/antd.css";
import { Switch, Route, Redirect} from 'react-router-dom';
import {adminRoutes} from './routes';
import Frame from './components/Frame/Index'
import {render} from "react-dom";

class App extends Component {
    render(){
        return (
            <Frame>
                <Switch>
                    {adminRoutes.map(route => {
                        return <Route key={route.path}
                                      path={route.path}
                                      exact={route.exact}
                                      render={routeProps => {
                            return <route.component {...routeProps} />;
                        }}
                        />
                    })}
                    <Redirect to = "/404" />
                </Switch>
            </Frame>
        );
    }

}

export default App;
