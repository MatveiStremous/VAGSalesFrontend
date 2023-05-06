import axios from "axios";
const url = "http://localhost:7070";

class AuthService {
    login(user) {
        return axios.post(url + "/login", user);
    };

    register(user) {
        return axios.post(url + "/registration", user);
    };

    validToken() {
        const token = localStorage.getItem("token");
        return (
            axios.get(url + "/validateToken", {
                headers: {
                    'Authorization': "Bearer " + token
                }
            })
        );
    }

    getUserInfo() {
        const token = localStorage.getItem("token");
        return axios.get(url + "/getUserInfo", {
            headers: {
                'Authorization': "Bearer " + token
            }
        })
    }

    logOut() {
        localStorage.removeItem("token");
    }

    changePassword(data) {
        const token = localStorage.getItem("token");
        return axios.put(url + "/changepassword", data, {
            headers: {
                'Authorization': "Bearer " + token
            }
        });
    }

    changePersonalInfo(data) {
        const token = localStorage.getItem("token");
        return axios.put(url + "/changeinfo", data, {
            headers: {
                'Authorization': "Bearer " + token
            }
        });
    }
}

const authService = new AuthService();
export default authService;