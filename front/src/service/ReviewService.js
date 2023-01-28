import axios from "axios";

const SHOP_API_BASE_URL = "http://localhost:8080/review";

class ReviewService {
    getReviewList(productId) {
        return axios.get(SHOP_API_BASE_URL + "/list/" + productId)
    }
    getMyReview(memberId) {
        return axios.get(SHOP_API_BASE_URL + "/myreview/" + memberId);
    }
    createReview(data) {
        return axios.post(SHOP_API_BASE_URL, data);
    }
    updateReview(id, data) {
        return axios.put(SHOP_API_BASE_URL + "/" + id, data);
    }
    deleteReview(id) {
        return axios.delete(SHOP_API_BASE_URL + "/" + id);
    }
    getImage(imageName) {
        return axios.get("http://localhost:8080/image/" + imageName)
    }
}

export default new ReviewService();