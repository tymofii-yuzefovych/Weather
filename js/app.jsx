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
import cacheProxy from './cacheProxy';

document.addEventListener('DOMContentLoaded', function() {

    class WeatherMain extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                loading: true,
                latitudes: 0,
                longitudes: 0,
                newObj: {}
            }
        }
        componentDidMount() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const latitude = position.coords.latitude.toFixed(2);
                    const longitude = position.coords.longitude.toFixed(2);
                    return this.setState({
                        latitudes: latitude,
                        longitudes: longitude,
                        loading: false
                    }, () => {
                        cacheProxy.get(`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitudes}&lon=${this.state.longitudes}&appid=a3f53024b94463abe3e782ec0818c7e3`)
                        .then(value =>{
                            console.log(value);

                          this.setState({newObj: value})})
                    })
                })
            }

        }

        render() {
          console.log(this.state.newObj);
            if (this.state.loading) {
                return <div>Loading...</div>
            } else {
                return <h1>Weather in {this.state.newObj.base}</h1>
            }
        }

    }

    class Template extends React.Component {
        render() {
            return <div>
                <div><WeatherMain/></div>
                {this.props.children}
            </div>;
        }
    }

    class NotFound extends React.Component {
        render() {
            return <h1>404, Nothing is here</h1>;
        }
    }

    class App extends React.Component {
        render() {
            return <Template/>
        }
    }

    ReactDOM.render(
        <App/>, document.getElementById('app'));
});
