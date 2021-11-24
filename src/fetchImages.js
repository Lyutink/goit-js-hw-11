import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_Key = "24366692-ce9347f3f27462bce5924cca4";

export function fetchImages(requestInInput, page) {
    return axios.get(`?key=${API_Key}&q=${requestInInput}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`);
}