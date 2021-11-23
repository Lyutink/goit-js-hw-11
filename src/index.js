import * as HTTPServise from './fetchImages';
import './sass/main.scss';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
//import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
let requestFromUser = '';

const searchFormRef = document.querySelector('.search-form');
const inputRef = document.querySelector('.search-form > input');
const galleryRef = document.querySelector('.gallery-list');


//searchFormRef.addEventListener('submit', debounce(onRequestFromUser, DEBOUNCE_DELAY));
searchFormRef.addEventListener('submit', onRequestFromUser);


function onRequestFromUser(event) {
    event.preventDefault();
    //
    //requestFromUser = event.target.value;
    requestFromUser = inputRef.value;
    console.log(requestFromUser);
    clearFoo();
    //requestFromUser = requestFromUser.trim();
    console.log("будем вызывать  fetchImages");
    HTTPServise.fetchImages(requestFromUser)
        .then(response => {
            console.log("totalHits", response.data.totalHits)
            if (!response.data.totalHits) {
                    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.',
                    {timeout: 4000,});
                clearFoo();
                return;
            }
            renderMarkupCard(response.data)
        })
        .catch(error => console.log("AAAAAAAAAA", error));
}

function clearFoo(){
    inputRef.value = '';
    galleryRef.innerHTML = '';
}
 
function renderMarkupCard(result) {
    //console.log(result.largeImageURL);
   // <a class="gallery-item" href="${res.largeImageURL}"></a>
    const markup = result.hits.map((res) => `
    <li class="photo-card">
    <div class = "thumb">
        <img class="photo-img" src="${res.webformatURL}" alt="${res.tags}" loading="lazy" />
    <div/>    
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            ${res.likes}
          </p>
          <p class="info-item">
            <b>Views</b>
            ${res.views}
          </p>
          <p class="info-item">
            <b>Comments</b>
            <span>${res.comments}</span>
          </p>
          <p class="info-item">
            <b>Downloads</b>
            ${res.downloads}
          </p>
        </div>
      </li>
      `).join('');
    galleryRef.innerHTML = markup;

}
     