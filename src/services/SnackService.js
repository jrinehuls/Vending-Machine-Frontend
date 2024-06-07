import Axios from "axios";

const baseUrl = "http://localhost:5188/Snack";

function getConfig() {
    return {
        headers: {
            'Content-Type': 'application/json'
        }
    }
}

export async function getAllSnacks() {
    return await Axios.get(baseUrl + "/all", getConfig());
}

export async function purchaseSnack(snackId, data) {
    url = baseUrl + `/purchase/${snackId}`
    return await Axios.post(url, data, getConfig());
}
