import axios from "axios";
const url = "http://localhost:7070";

class AuthService {
    async login(user) {
        const { data } = await axios.post(url + "/login", user);
        localStorage.setItem("token", data['jwt-token']);
        return;
    };

    register(user) {
        return (
            axios.post(url + "/registration", user)
        );
    };

    validToken() {
        const token = localStorage.getItem("token");
        return (
            axios.get(url + "/validateToken", {
                headers: {
                    'Authorization': "Bearer " + token
                }
            }).catch(function (error) {
                console.log(error);
                if (error.response.status === 500) {
                    localStorage.removeItem("token");
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
}

const authService = new AuthService();
export default authService;