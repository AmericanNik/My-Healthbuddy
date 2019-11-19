import Chart from "chart.js";

var myLineChart = new Chart(cty, {
    type: 'line',
    data: "",
    options: {
        scales: {
            yAxes: [{
                label: "Severity",
                borderColor: window.chartColor.red,
                backgroundColor: window.chartColor.red,
                fill: false,
                data: [],
                yaxisID: y - axis - 1,
            },
            {
                label: "Temperature",
                borderColor: window.chartColor.blue,
                backgroundColor: window.chartColor.blue,
                fill: false,
                data: [],
                yaxisID: y - axis - 2,

            },
            {
                label: "Humidity",
                borderColor: window.chartColor.green,
                backgroundColor: window.chartColor.green,
                fill: false,
                data: [],
                yaxisID: y - axis - 3,
            }, {
                label: "Activity Level",
                borderColor: window.chartColor.black,
                backgroundColor: window.chartColor.black,
                fill: false,
                data: [],
                yaxisID: y - axis - 4,
            }
            ]
        }
    }
}, ctx, {
    type: "",
    data: "",
    options: {
        scales: {
            xAxes: [{
                type: "category",
                labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
            }]
        }
    }
});