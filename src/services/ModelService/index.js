import axios from "axios";
const url = "http://localhost:7070";

class ModelService {
    getAllModels(setModels) {
        const token = localStorage.getItem("token");
        axios.get(url + "/models", {
            headers: {
                Authorization: "Bearer " + token,
            },
        }).then((response) => {
            setModels(response.data);
        });
    };

    getModelsByBrandId(brandId, setModels) {
        const token = localStorage.getItem("token");
        axios.get(url + "/models/" + brandId, {
            headers: {
                Authorization: "Bearer " + token,
            },
        }).then((response) => {
            setModels(response.data);
        });
    }

    deleteModel(id) {
        const token = localStorage.getItem("token");
        axios.delete(url + "/model/" + id, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
    }

    addNewModel(model) {
        const token = localStorage.getItem("token");
        axios.post(url + "/model", model, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
    }

    updateModel(id, model) {
        const token = localStorage.getItem("token");
        axios.put(url + "/model/" + id, model, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
    }
}

const modelService = new ModelService();
export default modelService;