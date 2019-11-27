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

    convertDate = () => {
        let monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let date = new Date(dateElem);
        let month = monthArr[date.getMonth()];
        let day = date.getDate();
        let fullDate = `${month} ${day}`;
        dateArray.push(fullDate);

        console.log(fullDate);
    }

    convertTemp = () => {
        let temp = tempElem/10;
        temperatureArray.push(temp);
    }

    convertHumidity=()=>{
        let humidity = humElem/10;
        humidityArray.push(humidity);
    }

    // temperature: Math.floor(((response.data.main.temp - 273.15) * 1.8 + 32) / 10),
    // humidity: Math.floor(response.main.humidity / 10)


    componentDidMount() {
        logs.getLogs()
            .then(logs =>
                logs.forEach(elem => this.convertDate(elem.logDate)),
                logs.forEach(elem => severityArray.push(elem.dailyWellbeing)),
                logs.forEach(elem => this.convertTemp(elem.logWeather.weatherTemp)),
                logs.forEach(elem => this.convertHumidity(elem.logWeather.weatherHumidity)),
                logs.forEch(elem => activityArray.push(elem.dailyActivity))
            )
        this.forceUpdate();
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