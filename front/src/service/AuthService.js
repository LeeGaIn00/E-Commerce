import axios from 'axios';

const AUTH_API_BASE_URL = "http://localhost:8080/auth";

const createTokenHeader = (token) => {
    return {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
};

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    const remainingDuration = adjExpirationTime - currentTime;
    return remainingDuration;
};

class AuthService {
    loginTokenHandler = (token, expirationTime) => {
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', String(expirationTime));
    
        const remainingTime = calculateRemainingTime(expirationTime);
        return remainingTime;
    }
    
    retrieveStoredToken = () => {
        const storedToken = localStorage.getItem('token');
        const storedExpirationDate = localStorage.getItem('expirationTime') || '0';
    
        const remaingTime = calculateRemainingTime(+ storedExpirationDate);
    
        if(remaingTime <= 1000) {
            localStorage.removeItem('token');
            localStorage.removeItem('expirationTime');
            return null
        }
    
        return {
            token: storedToken,
            duration: remaingTime
        }
    }
    
    signupActionHandler = (member) => {
        console.log(member)
        return axios.post(AUTH_API_BASE_URL + "/signup", member, {});
    };
    
    loginActionHandler = (id, password) => {
        const loginObject = { id, password };
        return axios.post(AUTH_API_BASE_URL + "/login", loginObject, {});
    };
    
    logoutActionHandler = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
    };

    getUserActionHandler = (token) => {
        return axios.get("http://localhost:8080/member/me", createTokenHeader(token));
    }

    // changeProfileActionHandler = (exProfile, newProfile, token) => {
    //     const changeProfObj = { exProfile, newProfile };
    //     return axios.post("http://localhost:8080/member/profile", changeProfObj, createTokenHeader(token));
    // }

    changePasswordActionHandler = (exPassword, newPassword, token) => {
        const changePwdObj = { exPassword, newPassword }
        return axios.post("http://localhost:8080/member/password", changePwdObj, createTokenHeader(token));
    }

    changeEmailActionHandler = (email, token) => {
        const changeEmailObj = { email }
        return axios.post("http://localhost:8080/member/email", changeEmailObj, createTokenHeader(token));
    }

    changeNameActionHandler = (name, token) => {
        const changeNameObj = { name }
        return axios.post("http://localhost:8080/member/name", changeNameObj, createTokenHeader(token));
    }

    changeAddressActionHandler = (address, token) => {
        const changeAddressObj = { address }
        return axios.post("http://localhost:8080/member/address", changeAddressObj, createTokenHeader(token));
    }

    changePhoneActionHandler = (phone, token) => {
        const changePhoneObj = { phone }
        return axios.post("http://localhost:8080/member/phone", changePhoneObj, createTokenHeader(token));
    }
}

export default new AuthService();

