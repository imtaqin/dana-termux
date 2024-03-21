import makeRequest from "../instance/requestHelper.js";
import { TRANSACTION_ENDPOINT } from "../utils/baseURL.js";
import { makeTrxHeader } from "../utils/headerHelper.js";
import { postDATA } from "../utils/postData.js";
export const getTrxHistory= async (cookie) =>{
    try {
        const response = await makeRequest(TRANSACTION_ENDPOINT, postDATA().data.transaction_postdata, makeTrxHeader(cookie));
        let parsedResponse;
        try {
            parsedResponse = JSON.parse(response);
        } catch (e) {
            throw new Error("Invalid JSON response");
        }
        
        return Array.isArray(parsedResponse) ? parsedResponse : parsedResponse;
    } catch (error) {
       return error.response ? error.response.body : error.message
    }

}
