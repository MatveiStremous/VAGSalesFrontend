import axios from "axios";
const url = "http://localhost:7070";

class CarService {
    getAllCars(setCars) {
        axios.get(url + "/cars").then((response) => {
            setCars(response.data);
        });
    };

    getCarInfo(id, setCar) {
        axios.get(url + "/carInfo/" + id).then((response) => {
            setCar(response.data);
        });
    };

    getCarsEnums() {
        return axios.get(url + "/carEnums/");
    }

    deleteCar(id) {
        const token = localStorage.getItem("token");
        axios.delete(url + "/car/" + id, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
    }

    addNewCar(car) {
        const token = localStorage.getItem("token");
        axios.post(url + "/car", car, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
    }

    updateCar(id, car) {
        const token = localStorage.getItem("token");
        axios.put(url + "/car/" + id, car, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
    }
}

const carService = new CarService();
export default carService;