import Axios from "axios";

class SnackService {

    baseUrl = "http://localhost:5188/api/Snack";

    config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

    constructor(){}

    async getAllSnacks() {
        return await Axios.get(this.baseUrl + "/all", this.config);
    }

    async getSnackById(snackId) {
        return await Axios.get(this.baseUrl + `/${snackId}`, this.config);
    }

    async purchaseSnack(snackId, data) {
        url = baseUrl + `/purchase/${snackId}`
        return await Axios.post(this.url, data, this.config);
    }
}

export default SnackService;
