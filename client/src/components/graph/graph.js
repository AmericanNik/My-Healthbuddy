import React, { Component } from "react";
import { Line } from "react-chartjs-2";
const logs = require("../../../../controllers/logs");

class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: [],
                datasets: [{
                    label: "Severity",
                    data: [// Severity Data from Database
                        
                    ],
                    backgroundColor: "black",
                    borderColor: "green",
                    borderWidth: 2,
                    fill: false

                },
                {
                    label: "Activity Level",
                    data: [
                        //Activity Level Data from Datbase
                        
                    ],
                    backgroundColor: "black",
                    borderColor: "blue",
                    borderWidth: 2,
                    fill: false

                },
                {
                    label: "Temperature",
                    data: [
                        //Temperature Data from Database
                        
                    ],
                    backgroundColor: "black",
                    borderColor: "red",
                    borderWidth: 2,
                    fill: false

                },
                {
                    label: "Humidity",
                    data: [
                        // Humidity Data from Database
                        
                    ],
                    backgroundColor: "black",
                    borderColor: "purple",
                    borderWidth: 2,
                    fill: false


                }]
            }
        }
    }

    componentDidMount() {
        let dateArray = [];
        let severityArray = [];
        let temperatureArray = [];
        let humidityArray = [];

        logs.getLogs()
            .then(logs =>
                logs.date.forEach(dateElem => dateArray.push(dateElem)),
                logs.severity.forEach(sevElem => severityArray.push(sevElem)),
                logs.temperature.forEach(tempElem => temperatureArray.push(tempElem)),
                logs.humidity.forEach(humElem => humidityArray.push(humElem))

            )
            .then(this.setState({

            }))


    }


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