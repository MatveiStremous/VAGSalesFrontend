import axios from "axios";
const url = "http://localhost:7070";

class RequestService {
    getAllRequests() {
        return axios.get(url + "/requests");
    };

    getAllRequestsByEmail(email) {
        return axios.get(url + "/requests/" + email);
    };

    deleteRequest(id) {
        const token = localStorage.getItem("token");
        return axios.delete(url + "/request/" + id, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
    }

    addNewRequest(request) {
        return axios.post(url + "/request", request);
    }

    updateRequest(id, request) {
        const token = localStorage.getItem("token");
        return axios.put(url + "/request/" + id, request, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
    }

    changeStatus(id, status) {
        console.log(status);
        const token = localStorage.getItem("token");
        return axios.put(url + "/request/status/" + id + "/" + status, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
    }

    getDaysData() {
        return axios.get(url + "/daysdata");
    }

    getCarsData() {
        return axios.get(url + "/carsdata");
    }
}

const requestService = new RequestService();
export default requestService;