import axios from "axios";

export default {
    getLogs: function () {
        return axios.get("/api/v1/logs", res => {
            console.log(res);
        });
    },
    createUser: function () {
        return axios.post("/api/v1/register", res => {
            console.log(res);
        })
    },
    createLog : function(){
        return axios.post("api/v1/logs/createLog", res => {
            console.log(res);
        })
    }

}