import axios from 'axios';

const SHOP_API_BASE_URL = "http://localhost:8080/shop";

class ShopService {
    getCateList() {
        return axios.get(SHOP_API_BASE_URL + "/category-list");
    }
    getProducts(categoryId) {
        return axios.post(SHOP_API_BASE_URL + "/" + categoryId);
    }
    getProductById(id) {
        return axios.get(SHOP_API_BASE_URL + "/detail/" + id);
    }
    addCart(data) {
        return axios.post(SHOP_API_BASE_URL + "/cart", data);
    }
    getCartItem(memberId) {
        return axios.get(SHOP_API_BASE_URL + "/cart/" + memberId);
    }
    search(keyword) {
        return axios.get(SHOP_API_BASE_URL + "/search?keyword=" + keyword)
    }
    /* 관심상품 */
    setLike(memberId, productId) {
        return axios.post("http://localhost:8080/wishlist/" + memberId + "/" + productId)
    }
    /* 관심상품 취소 */
    setUnlike(memberId, productId) {
        return axios.delete("http://localhost:8080/wishlist/" + memberId + "/" + productId)
    }
    getLikeId(category, memberId) {
        return axios.get(SHOP_API_BASE_URL +  "/" + category + "?memberId=" + memberId)
    }
}

export default new ShopService();