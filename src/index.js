import * as HTTPServise from './fetchImages';
import './sass/main.scss';
//import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
let requestFromUser = '';

const searchFormRef = document.querySelector('.search-form');
const inputRef = document.querySelector('.search-form > input');


//searchFormRef.addEventListener('submit', debounce(onRequestFromUser, DEBOUNCE_DELAY));
searchFormRef.addEventListener('submit', onRequestFromUser);

function onRequestFromUser(event) {
    event.preventDefault();

    //requestFromUser = event.target.value;
    requestFromUser = inputRef.value;
    console.log(requestFromUser);
    //requestFromUser = requestFromUser.trim();
    console.log("будем вызывать  fetchImages");
    HTTPServise.fetchImages(requestFromUser);
}
 