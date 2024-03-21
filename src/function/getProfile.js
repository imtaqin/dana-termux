import makeRequest from "../instance/requestHelper.js";
import { PROFILE_ENDPOINT } from "../utils/baseURL.js";
import { makeHeadersProfile } from "../utils/headerHelper.js";
import { postDATA } from "../utils/postData.js";
export const getProfile = async (cookie) =>{
    try {
        const response = await makeRequest(PROFILE_ENDPOINT, postDATA().data.profile_postdata, makeHeadersProfile(cookie));
        let parsedResponse;
        try {
            parsedResponse = JSON.parse(response);
        } catch (e) {
            throw new Error("Invalid JSON response");
        }
        
        return Array.isArray(parsedResponse) ? parsedResponse : parsedResponse;
    } catch (error) {
       return []; 
    }
}
