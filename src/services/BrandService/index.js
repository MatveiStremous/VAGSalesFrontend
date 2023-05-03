import axios from "axios";
const url = "http://localhost:7070";

class BrandService {
    getAllBrands(setBrands) {
        axios.get(url + "/brands").then((response) => {
            setBrands(response.data);
        });
    };

    deleteBrand(id) {
        const token = localStorage.getItem("token");
        axios.delete(url + "/brand/" + id, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
    }

    addNewBrand(brand) {
        const token = localStorage.getItem("token");
        axios.post(url + "/brand", brand, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
    }

    updateBrand(id, brand) {
        const token = localStorage.getItem("token");
        axios.put(url + "/brand/" + id, brand, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
    }
}

const brandService = new BrandService();
export default brandService;