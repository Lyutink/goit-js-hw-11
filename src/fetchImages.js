const BASE_URL = "https://pixabay.com/api/";
const API_Key = "24366692-ce9347f3f27462bce5924cca4";
// const options = {
//     headers: {
//     key: API_Key,
//     //q: - термин для поиска. То, что будет вводить пользователь.
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: 'true',
// }

export function fetchImages(requestInInput) {

    return fetch(`${BASE_URL}?key=${API_Key}&q=${requestInInput}&image_type=photo&orientation=horizontal&safesearch=true`)
        .then(respons => {
            if (!respons.ok) {
            throw Error(respons.statusText);
        }
        return console.log(respons.json());
        })
        // .catch(() => {
        //     return console.log(respons);
        // })
}