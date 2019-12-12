import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom';
import Logs from "../../utils/API";
import demoLogs from "../../utils/demoLogs";
var moment = require("moment");

let dates = [];

class LogList extends Component {
    constructor(props) {
        super(props);
        this.state = { date: [] }
    }

    componentDidMount() {

    }
  
    render() {
        return (
            <div className="container">
                <div>
                    {demoLogs.map(function (item, index) {
                        return <Fragment key={index}>
                            <hr />
                            <h3>Date: {moment((item.date)).format("MMM D YYYY")}</h3>
                            <h3>Daily Well-Being:{item.dailyWellbeing}</h3>
                            <h3>Activity Level :{item.activity}</h3>
                            <h3>Temperature:{item.weather.temperature}&deg;F</h3>
                            <h3>Humidity:{item.weather.humidity}%</h3>
                            <h3>Log Note :{item.logEntry}</h3>
                        </Fragment>
                    }
                    )}
                </div>
            </div>
        );
    };
}

export default LogList;