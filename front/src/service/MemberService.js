import axios from 'axios';

const MEMBER_API_BASE_URL = "http://localhost:8080/member";

class MemberService {
    /* 아이디 중복 검사 */
    checkId(id) {
        return axios.get(MEMBER_API_BASE_URL + "/check/id/" + id);
    }
    /* 이메일 중복 검사 */
    checkEmail(email) {
        return axios.get(MEMBER_API_BASE_URL + "/check/email/" + email);
    }
}

export default new MemberService();