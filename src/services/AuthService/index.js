import axios from "axios";
const url = "http://localhost:7070";

class AuthService {
    login(user) {
        return (
            axios.post(url + "/login", user)
                .then((res) => console.log(res.data))
        );
    };

    register(user) {
        return (
            axios.post(url + "/registration", user)
        );
    };
}

const authService = new AuthService();
export default authService;