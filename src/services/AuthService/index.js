import axios from "axios";
const url = "http://localhost:7070";

class AuthService {
    login(user) {
        return (
            axios.post(url + "/login", user)
                .then((res) => localStorage.setItem("token", res.data['jwt-token']))
        );
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
        const resp = axios.get(url + "/getUserInfo", {
            headers: {
                'Authorization': "Bearer " + token
            }
        });
        console.log(resp.data)
        return resp.data;
    }
}

const authService = new AuthService();
export default authService;