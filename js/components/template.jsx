import React from 'react';
import ReactDOM from 'react-dom';
import cacheProxy from './cacheProxy';
import {WeatherSearch} from './weatherSearch.jsx';
import {WeatherMain} from './weatherMain.jsx';
import {NotFound} from './notFound.jsx';
import '../../css/style.css';
import '../../css/bootstrap.min.css';
export class Template extends React.Component {
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
        return <div id="main">
            <div className={'container-floid'}>
                <div className={'row'}>
                    <div className={'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                        <header>
                            <a href="#"><img id="span1" src="./img/2.svg" width="50px" height="50px" alt=""/></a>

                            <span id="span2">
                                <a>Weather</a>
                            </span>

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
