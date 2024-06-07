import { AxiosError } from "axios";

export function getErrorResponse(error) {
    const status = error.response.status ?? null
    const responseData = {
        errors: [],
        message: ""
    }
    if (status >= 400 && status < 500) {
        responseData.errors = error.response.data.errors ?? []
        responseData.message = error.response.data.errorMessage ?? ""
        return responseData;
    }
    return null;
}
