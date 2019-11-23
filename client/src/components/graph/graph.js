import React, { Component } from "react";
import { Line } from "react-chartjs-2";
const logs = require("../../../../controllers/logs");

let dateArray = [];
let severityArray = [];
let activityArray = [];
let temperatureArray = [];
let humidityArray = [];

class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: dateArray,
                datasets: [{
                    label: "Severity",
                    data: severityArray,
                    backgroundColor: "green",
                    borderColor: "green",
                    borderWidth: 2,
                    fill: false

                },
                {
                    label: "Activity Level",
                    data: activityArray,
                    backgroundColor: "blue",
                    borderColor: "blue",
                    borderWidth: 2,
                    fill: false

                },
                {
                    label: "Temperature",
                    data: temperatureArray,
                    backgroundColor: "red",
                    borderColor: "red",
                    borderWidth: 2,
                    fill: false

                },
                {
                    label: "Humidity",
                    data: humidityArray,
                    backgroundColor: "purple",
                    borderColor: "purple",
                    borderWidth: 2,
                    fill: false


                }]
            }
        }
    }

    componentDidMount() {
        logs.getLogs()
            .then(logs =>
                logs.logDate.forEach(dateElem => dateArray.push(dateElem)),
                logs.dailyWellbeing.forEach(sevElem => severityArray.push(sevElem)),
                logs.logWeather.temperature.forEach(tempElem => temperatureArray.push(tempElem)),
                logs.logWeather.humidity.forEach(humElem => humidityArray.push(humElem)),
                logs.dailyActivity.forEch(actElem => activityArray.push(actElem))
            )
    };


    render() {
        return (
            <div className="graph">
                <Line
                    data={this.state.chartData}
                    width={300}
                    height={300}
                    options={{
                        maintainAspectRatio: false,
                        title: {
                            display: true,
                            text: "Health Buddy Trends",
                            fontSize: 25
                        }
                    }}
                />

            </div>
        );
    }
};






export default Graph;