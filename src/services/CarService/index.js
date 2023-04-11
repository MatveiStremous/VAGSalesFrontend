import axios from "axios";
const url = "http://localhost:7070";

class CarService {
    getAllCars(setCars) {
        const token = localStorage.getItem("token");
        axios.get(url + "/cars", {
            headers: {
                Authorization: "Bearer " + token,
            },
        }).then((response) => {
            setCars(response.data);
        });
    };

    getCarInfo(id, setCar) {
        const token = localStorage.getItem("token");
        axios.get(url + "/carInfo/" + id, {
            headers: {
                Authorization: "Bearer " + token,
            },
        }).then((response) => {
            setCar(response.data);
        });
    };

    getCarsEnums(setCarEnums) {
        const token = localStorage.getItem("token");
        axios.get(url + "/carsEnums/", {
            headers: {
                Authorization: "Bearer " + token,
            },
        }).then((response) => {
            setCarEnums(response.data);
        });
    }

    deleteModel(id) {
        const token = localStorage.getItem("token");
        axios.delete(url + "/car/" + id, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
    }

    addNewModel(car) {
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