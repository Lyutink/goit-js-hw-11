import * as HTTPServise from './fetchImages';
import './sass/main.scss';
//import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
let requestFromUser = '';

const searchFormRef = document.querySelector('.search-form');
const inputRef = document.querySelector('.search-form > input');
const galleryRef = document.querySelector('.gallery');


//searchFormRef.addEventListener('submit', debounce(onRequestFromUser, DEBOUNCE_DELAY));
searchFormRef.addEventListener('submit', onRequestFromUser);

function onRequestFromUser(event) {
    event.preventDefault();

    //requestFromUser = event.target.value;
    requestFromUser = inputRef.value;
    console.log(requestFromUser);
    //requestFromUser = requestFromUser.trim();
    console.log("будем вызывать  fetchImages");
    HTTPServise.fetchImages(requestFromUser)
        .then(response => renderMarkupCard(response.data))
        .catch(error => console.log("AAAAAAAAAA", error));
}

// async function renderMarkupCard(response) {
//     console.log(response.hits);
//     markup = await response.map(result => result.name);
//     console.log(markup);
//}
 
function renderMarkupCard(result) {
    //console.log(result.largeImageURL);
    const markup = result.hits.map((res) => `<div class="photo-card">
        <img src="${res.previewURL}" alt="" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes: ${res.likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${res.views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${res.comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${res.downloads}</b>
          </p>
        </div>
      </div>`).join('');
    galleryRef.innerHTML = markup;

}