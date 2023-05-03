import axios from "axios";
const url = "http://localhost:7070";

class UserService {
    getAllUsers() {
        const token = localStorage.getItem("token");
        return axios.get(url + "/users", {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
    };

    changeRole(id, role) {
        const token = localStorage.getItem("token");
        return axios.put(url + "/user/role/" + id + "/" + role, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
    }
}

const userService = new UserService();
export default userService;