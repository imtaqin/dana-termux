import makeRequest from "../instance/requestHelper.js";
import { TRX_DETAIL_ENDPOINT } from "../utils/baseURL.js";
import { makeTrxHeader } from "../utils/headerHelper.js";
import { postDATA } from "../utils/postData.js";
export const getTrxDetails= async(cookie, biz_id, payment_id)=> {
    try {
        if (biz_id) {
            const response = await makeRequest(TRX_DETAIL_ENDPOINT, postDATA(biz_id, payment_id).data.transactionDetail_postdata, makeTrxHeader(cookie));
            let parsedResponse;
        try {
            parsedResponse = JSON.parse(response);
        } catch (e) {
            throw new Error("Invalid JSON response");
        }
        
        return Array.isArray(parsedResponse) ? parsedResponse : parsedResponse;
        } else {
            return {
                trx_detail: "data not found"
            }
        }

    } catch (error) {
        return error.response ? error.response.body : error.message
    }

}
