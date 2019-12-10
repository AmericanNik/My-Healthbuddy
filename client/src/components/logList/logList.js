import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Logs from "../../utils/API";
import demoLogs from "../../utils/demoLogs";



class LogList extends Component {
    constructor(props) {
        super(props);

    }



    render() {
        return (
            <div className="container">
                <h1>This is a list of your logs</h1>
                <ul>
                    {demoLogs.forEach(function (elem) {
                        return <li>Well-Being:{elem.dailyWellbeing}</li>
                    })}
                </ul>
            </div>
        );
    };
}

export default LogList;