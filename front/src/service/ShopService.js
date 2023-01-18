import axios from 'axios';

const SHOP_API_BASE_URL = "http://localhost:8080/shop";

class ShopService {
    getCateList() {
        return axios.get(SHOP_API_BASE_URL + "/category-list");
    }
    getProducts(categoryId) {
        return axios.get(SHOP_API_BASE_URL + "/" + categoryId);
    }
    getProductById(id) {
        return axios.get(SHOP_API_BASE_URL + "/detail/" + id);
    }
    search(keyword) {
        return axios.get(SHOP_API_BASE_URL + "/search?keyword=" + keyword)
    }
}

export default new ShopService();