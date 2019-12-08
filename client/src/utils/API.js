import axios from "axios";

export default {
    getLogs: function () {
        return axios.get("/api/v1/logs", res => {
            console.log(res);
        });
    }
}