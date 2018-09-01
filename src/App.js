import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import interceptor from './components/layout/interceptor';

import Template from './components/template'

import Challenge from './components/routes/challenge';

import './App.scss';

const Home = () => (
    <div>home</div>
);

class App extends Component {
    constructor(props) {
        super(props);

        interceptor();
    }

    //noinspection JSMethodCanBeStatic
    render() {
        return (
            <div className="App">
                <Template>
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/challenge/:id" exact component={Challenge}/>
                    </Switch>
                </Template>
            </div>
        );
    }
}

export default App;