import axios from "axios";

const MYPAGE_API_BASE_URL = "http://localhost:8080";

class MyPageService {
    /* 마이페이지 찜 목록 가져오기 */
    getWishlist(memberId) {
        return axios.get(MYPAGE_API_BASE_URL + "/wishlist/" + memberId)
    }
}

export default new MyPageService();