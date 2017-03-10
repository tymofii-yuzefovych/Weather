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
import '../css/bootstrap.min.css';

document.addEventListener('DOMContentLoaded', function() {

    class WeatherSearch extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                text: '',
                newCity: {}
            }
        }

        render() {
            if (this.props.loading) {
                return null;
            } else {
                return <div>
                    <h2>
                        Weather in {this.props.newCity.name},{this.props.newCity.sys.country}
                    </h2><br/>
                    <h3><img src={`http://openweathermap.org/img/w/${this.props.newCity.weather[0].icon}.png`} alt="icon weather"/> {this.props.newCity.main.temp}
                        &#8451; {this.props.newCity.weather[0].description.charAt(0).toUpperCase()}{this.props.newCity.weather[0].description.substr(1)}
                    </h3>
                    <table>
                        <tbody>
                            <tr>
                                <td>Wind</td>
                                <td>Gentle Breeze {this.props.newCity.wind.speed}
                                    <br/>
                                    South-southwest({this.props.newCity.wind.deg})
                                </td>
                            </tr>
                            <tr>
                                <td>Cloudiness</td>
                                <td>{this.props.newCity.weather[0].description}</td>
                            </tr>
                            <tr>
                                <td>Pressure</td>
                                <td>{this.props.newCity.main.pressure}
                                    hpa</td>
                            </tr>
                            <tr>
                                <td>Humidity</td>
                                <td>{this.props.newCity.main.humidity}
                                    %</td>
                            </tr>
                            <tr>
                                <td>Sunrise</td>
                                <td>{new Date(this.props.newCity.sys.sunrise * 1000).toLocaleTimeString()}</td>
                            </tr>
                            <tr>
                                <td>Sunset</td>
                                <td>{new Date(this.props.newCity.sys.sunset * 1000).toLocaleTimeString()}</td>
                            </tr>
                            <tr>
                                <td>Geo coords</td>
                                <td>[{this.props.newCity.coord.lat},{this.props.newCity.coord.lon}]</td>
                            </tr>
                        </tbody>
                    </table>
                    <hr/>
                </div>
            }
        }

    }

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
        constructor(props) {
            super(props);

            this.state = {
                text: '',
                click: false,
                loading: true
            }

        }
        handleTextChange = (event) => {
            this.setState({
                text: event.target.value.replace(/\d/g, '')
            });
        };

        handleButtonClick = (event) => {
            event.preventDefault();

            cacheProxy.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.text}&units=metric&appid=a3f53024b94463abe3e782ec0818c7e3`).then(value => this.setState({newCity: value, loading: false}))
            this.setState({
                click: this.state.click
                    ? false
                    : true,
                text: ''
            })

        }

        render() {
            return <div>
                <div className={'container-floid'}>
                    <div className={'row'}>
                        <div className={'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                            <header>
                                <a href="#"><img id="span1" src="./img/2.svg" width="50px" height="50px" alt=""/></a>
                                <a>
                                    <span id="span2">Weather</span>
                                </a>
                                <div id="forms">
                                    <form action="">
                                        <input type="text" placeholder="Search city name" value={this.state.text} onChange={this.handleTextChange}/>
                                        <button type="submit" onClick={this.handleButtonClick}>Search</button>
                                    </form>
                                </div>
                            </header>
                        </div>
                    </div>
                    <div className='row'>
                        <div className={'col-xs-12 col-sm-12 col-md-12 col-lg-12 weathersearch'}>
                            <div>
                                <WeatherSearch city={this.state.text} click={this.state.click} newCity={this.state.newCity} loading={this.state.loading}/>

                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className={'col-xs-12 col-sm-12 col-md-12 col-lg-12 weathermains'}>
                            <h1 style={{
                                textAlign: 'center'
                            }}>Current weather and forecasts in your city</h1>
                            <div className="weathermain"><WeatherMain/></div>
                        </div>
                    </div>
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
            return <Router history={hashHistory}>
                <Route path='/' component={Template}>
                    <IndexRoute component={WeatherMain}/>
                    <Route path='*' component={NotFound}/>
                </Route>
            </Router>;
        }
    }

    ReactDOM.render(
        <App/>, document.getElementById('app'));
});
