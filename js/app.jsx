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
import '../css/style.css';
import '../css/bootstrap.min.css'

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
                    const latitude = position.coords.latitude.toFixed(4);
                    const longitude = position.coords.longitude.toFixed(4);
                    return this.setState({
                        latitudes: latitude,
                        longitudes: longitude
                    }, () => {
                        cacheProxy.get(`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitudes}&lon=${this.state.longitudes}&units=metric&appid=a3f53024b94463abe3e782ec0818c7e3`).then(value => {
                            this.setState({newObj: value, loading: false})
                        })
                    })
                })
            }

        }

        render() {
            if (this.state.loading) {
                return <div>
                    <div id="fountainG">
                        <div id="fountainG_1" className="fountainG"></div>
                        <div id="fountainG_2" className="fountainG"></div>
                        <div id="fountainG_3" className="fountainG"></div>
                        <div id="fountainG_4" className="fountainG"></div>
                        <div id="fountainG_5" className="fountainG"></div>
                        <div id="fountainG_6" className="fountainG"></div>
                        <div id="fountainG_7" className="fountainG"></div>
                        <div id="fountainG_8" className="fountainG"></div>
                    </div>
                </div>
            } else {
                return <div>
                    <h2>
                        Weather in {this.state.newObj.name},{this.state.newObj.sys.country}
                    </h2><br/>
                    <h3><img src={`http://openweathermap.org/img/w/${this.state.newObj.weather[0].icon}.png`} alt="icon weather"/> {this.state.newObj.main.temp}
                        &#8451; {this.state.newObj.weather[0].description.charAt(0).toUpperCase()}{this.state.newObj.weather[0].description.substr(1)}
                    </h3>

                    <table>
                        <tbody>
                            <tr>
                                <td>Wind</td>
                                <td>Gentle Breeze {this.state.newObj.wind.speed}
                                    <br/>
                                    South-southwest({this.state.newObj.wind.deg})
                                </td>
                            </tr>
                            <tr>
                                <td>Cloudiness</td>
                                <td>{this.state.newObj.weather[0].description}</td>
                            </tr>
                            <tr>
                                <td>Pressure</td>
                                <td>{this.state.newObj.main.pressure}
                                    hpa</td>
                            </tr>
                            <tr>
                                <td>Humidity</td>
                                <td>{this.state.newObj.main.humidity}
                                    %</td>
                            </tr>
                            <tr>
                                <td>Sunrise</td>
                                <td>{new Date(this.state.newObj.sys.sunrise * 1000).toLocaleTimeString()}</td>
                            </tr>
                            <tr>
                                <td>Sunset</td>
                                <td>{new Date(this.state.newObj.sys.sunset * 1000).toLocaleTimeString()}</td>
                            </tr>
                            <tr>
                                <td>Geo coords</td>
                                <td>[{this.state.newObj.coord.lat},{this.state.newObj.coord.lon}]</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
        }

    }

    class Template extends React.Component {
        handleTextChange = (event) => {
            this.setState({text: event.target.value});
        };
        render() {
            return <div>
                <div className={'container-floid'}>

                    <div className={'row'}>
                        <div className={'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                            <header>
                                <span>Weather</span>
                            </header>
                        </div>
                    </div>
                    <div className='row'>
                        <div id="forms" className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                            <form action="">
                                <label htmlFor="">
                                    <input type="text" placeholder="Search your city name" onChange={this.handleTextChange}/></label>
                                <button type="submit" onClick={this.handleButtonClick}>Search</button>
                            </form>
                        </div>
                    </div>
                    <div className='row'>
                        <div className={'col-xs-12 col-sm-6 col-md-6 col-lg-6 weathermains'}>
                            <h1 style={{
                                textAlign: 'center'
                            }}>Current weather and forecasts in your city</h1>
                            <div className="weathermain"><WeatherMain/></div>
                        </div>
                    </div>
                    {this.props.children}
                </div>
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
