import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
                datasets: [{
                    label: "Severity",
                    data: [// Severity Data from Database
                        5, 6, 7, 8, 10, 1, 2, 5, 2, 4
                    ],
                    backgroundColor: "black",
                    borderColor: "green",
                    borderWidth: 3,
                    fill: false

                },
                {
                    label: "Activity Level",
                    data: [
                        //Activity Level Data from Datbase
                        1, 2, 3, 6, 10, 4, 5, 7, 4, 9
                    ],
                    backgroundColor: "black",
                    borderColor: "blue",
                    borderWidth: 3,
                    fill: false

                },
                {
                    label: "Temperature",
                    data: [
                        //Temperature Data from Database
                        6, 6, 6, 6, 6, 7, 8, 5, 10, 8
                    ],
                    backgroundColor: "black",
                    borderColor: "red",
                    borderWidth: 3,
                    fill: false

                },
                {
                    label: "Humidity",
                    data: [
                        // Humidity Data from Database
                        1, 2, 1, 3, 4, 5, 2, 3, 4, 5
                    ],
                    backgroundColor: "black",
                    borderColor: "purple",
                    borderWidth: 3,
                    fill: false


                }]
            }
        }
    }

    render() {
        return (
            <div className="graph">
                <Line
                    data={this.state.chartData}
                    width={300}
                    height={300}
                    options={{
                        maintainAspectRatio:false,
                        title: {
                            display: true,
                            text: "Health Buddy Trends",
                            fontSize:25
                        }
                    }}
                />

            </div>
        )
    }

}




export default Graph;