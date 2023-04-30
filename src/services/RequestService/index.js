import axios from "axios";
const url = "http://localhost:7070";

class RequestService {
    getAllRequests() {
        return axios.get(url + "/requests");
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
}

const requestService = new RequestService();
export default requestService;