import React from 'react';
import ReactDOM from 'react-dom';
import {
    Router,
    Route,
    Link,
    IndexLink,
    IndexRoute,
    hashHistory
} from 'react-router';
import cacheProxy from './components/cacheProxy';
import '../css/style.css';
import '../css/bootstrap.min.css';
import {WeatherSearch} from './components/weatherSearch.jsx';
import {WeatherMain} from './components/weatherMain.jsx';
import {NotFound} from './components/notFound.jsx';
import {Template} from './components/template.jsx';

document.addEventListener('DOMContentLoaded', function() {

    class App extends React.Component {
        render() {
            return <Router history={hashHistory}>
                <Route path='/' component={Template}>
                    <IndexRoute component={WeatherMain}/>
                </Route>
                <Route path='*' component={NotFound}/>
            </Router>;
        }
    }

    ReactDOM.render(
        <App/>, document.getElementById('app'));
});
