import axios from "axios";

const IMAGE_API_BASE_URL = "http://localhost:8080/image";

class ImageService {
    upload(form) {
        return axios.post(IMAGE_API_BASE_URL + "/upload", form, { headers: { 'Content-Type': 'multipart/form-data' } });
    }
    delete(form) {
        return axios.post(IMAGE_API_BASE_URL + "/delete", form, { headers: { 'Content-Type': 'multipart/form-data' } })
    }
}

export default new ImageService();