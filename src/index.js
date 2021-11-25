import * as HTTPServise from './fetchImages';
import './sass/main.scss';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const headerRef = document.querySelector('.header');
const searchFormRef = document.querySelector('.search-form');
const inputRef = document.querySelector('.search-form > input');
const galleryRef = document.querySelector('.gallery');
const btnMoreRef = document.querySelector('.load-more');

let requestFromUser = '';
let page = 1;
let perPage = 40;
let totalResults = 0;
let stillResults = 0;
let gallery = new SimpleLightbox('.gallery a');

searchFormRef.addEventListener('submit', onRequestFromUser);

// function onRequestFromUser(event) {
//     event.preventDefault();
//     clearFoo();
//     requestFromUser = inputRef.value;
//     page = 1;
//     HTTPServise.fetchImages(requestFromUser, page)
//         .then(response => {
//             console.log("totalHits", response.data.totalHits)
//             if (!response.data.totalHits) {
//                     Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.',);
//                 clearFoo();
//                 return;
//             }
//             totalResults = response.data.totalHits;
//             Notiflix.Notify.success(`Hooray! We found ${totalResults} images.`)
//             stillResults = totalResults;
//             //console.log("totalHits", totalResults);
//             renderMarkupCard(response.data);
//             gallery.refresh();
//             stillResults -= perPage;
//             if (stillResults > perPage) {
//                 console.log("more");
//                 showBtnMore();
//             }
//         })
//         .catch(error => console.log("AAAAAAAAAA", error));
// }

async function onRequestFromUser(event) {
    event.preventDefault();
    
    requestFromUser = inputRef.value;
    clearFoo();
    page = 1;
    try {
        const response = await HTTPServise.fetchImages(requestFromUser, page);
        console.log("totalHits", response.data.totalHits)
        if (!response.data.totalHits) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.',);
            clearFoo();
            return;
        }
        totalResults = response.data.totalHits;
        Notiflix.Notify.success(`Hooray! We found ${totalResults} images.`)
        stillResults = totalResults;
        renderMarkupCard(response.data);
        gallery.refresh();
        stillResults -= perPage;
        if (stillResults > perPage) {
            console.log("more");
            showBtnMore();
        }
    } catch (error) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.',);
            clearFoo();
            return;
    }
}

function clearFoo(){
    inputRef.value = '';
    galleryRef.innerHTML = '';
    btnMoreRef.classList.add('is-hidden');
}
 
function renderMarkupCard(result) {
    const markup = result.hits.map((res) => `
    <a href="${res.largeImageURL}">
    
        <img class="photo-img" src="${res.webformatURL}" alt="${res.tags}" loading="lazy" />
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
      
      </a>
      `).join('');
    galleryRef.insertAdjacentHTML("beforeend", markup);

}
     
function showBtnMore() {
    btnMoreRef.addEventListener('click', loadMore);
    btnMoreRef.classList.remove('is-hidden');  
}

function loadMore() {
    console.log("будем грузить ещё", page);
    page += 1;
    HTTPServise.fetchImages(requestFromUser, page)
        .then(response => {

            renderMarkupCard(response.data);
            gallery.refresh();
            stillResults -= perPage;
            if (stillResults > 0) { Notiflix.Notify.info(`There are ${stillResults} more images.`,); };

            if (stillResults <= 0) {
                Notiflix.Notify.info(`We're sorry, but you've reached the end of search results.`,);
                btnMoreRef.classList.add('is-hidden');
                return;
            }
            
        })
        .catch(error => console.log("AAAAAAAAAA", error));
}
 
