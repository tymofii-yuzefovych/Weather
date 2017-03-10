import React from 'react';
import ReactDOM from 'react-dom';
import cacheProxy from './cacheProxy';

export class WeatherSearch extends React.Component {
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
