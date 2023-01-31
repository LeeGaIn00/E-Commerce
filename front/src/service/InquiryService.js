import axios from "axios";

const INQ_API_BASE_URL = "http://localhost:8080/inquiry";

class InquiryService {
    getInquiryList(productId) {
        return axios.get(INQ_API_BASE_URL + "/list/" + productId)
    }
    createInquiry(data) {
        return axios.post(INQ_API_BASE_URL, data);
    }
    updateInquiry(id, data) {
        return axios.put(INQ_API_BASE_URL + "/" + id, data);
    }
    deleteInquiry(id) {
        return axios.delete(INQ_API_BASE_URL + "/" + id)
    }
}

export default new InquiryService();